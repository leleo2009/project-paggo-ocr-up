import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as Tesseract from 'tesseract.js';
import axios from 'axios';
import * as fs from 'fs';
import * as pdfParse from 'pdf-parse';
import { config } from 'dotenv';

config(); // Carrega variáveis de ambiente

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  private cleanExtractedText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  async getDocumentTextById(id: string | number) {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }

    return this.prisma.document.findUnique({
      where: { id: numericId },
    });
  }

  async getDocumentsByUserId(userId: number) {
    return this.prisma.document.findMany({
      where: { userId },
    });
  }

  async saveUpload(fileName: string, filePath: string, userId: number) {
    const document = await this.prisma.document.create({
      data: {
        fileName,
        filePath,
        userId,
      },
    });

    const isPDF = fileName.toLowerCase().endsWith('.pdf');

    let extractedText: string;

    if (isPDF) {
      extractedText = await this.extractTextFromPDF(filePath);
    } else {
      extractedText = await this.extractTextFromImage(filePath);
    }

    const cleanedText = this.cleanExtractedText(extractedText);
    const explanation = await this.sendToGPT(cleanedText);

    const updatedDocument = await this.prisma.document.update({
      where: { id: document.id },
      data: {
        text: cleanedText,
        explanation,
      },
    });

    return updatedDocument;
  }

  private async extractTextFromImage(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(
        filePath,
        'por',
        {
          logger: (m) => console.log(m),
        }
      )
        .then(({ data: { text } }) => {
          resolve(text);
        })
        .catch((err) => {
          console.error('Erro no OCR:', err);
          reject('Erro ao extrair texto');
        });
    });
  }

  private async extractTextFromPDF(filePath: string): Promise<string> {
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;
    } catch (err) {
      console.error('Erro ao ler PDF:', err);
      throw new Error('Erro ao extrair texto do PDF');
    }
  }

  public async sendToGPT(extractedText: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('API Key não encontrada');
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: extractedText }],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.error('Erro ao chamar o GPT:', error.response ? error.response.data : error.message);
      throw new Error('Erro ao obter explicação do GPT');
    }
  }

  async askQuestionToGPT(documentId: number, question: string, userId: number) {
    const document = await this.prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      throw new Error('Documento não encontrado');
    }

    if (document.userId !== userId) {
      throw new Error('Acesso negado ao documento');
    }

    if (!document.text) {
      throw new Error('Texto do documento está vazio');
    }

    const prompt = `Texto do documento:\n${document.text}\n\nPergunta: ${question}`;
    const answer = await this.sendToGPT(prompt);

    return { answer };
  }
}
