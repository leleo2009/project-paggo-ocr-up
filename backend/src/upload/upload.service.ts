import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as Tesseract from 'tesseract.js';
import axios from 'axios';
import { config } from 'dotenv';

config(); // Carrega variáveis de ambiente

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  // Função para limpar o texto extraído (remove espaços extras e quebras de linha)
  private cleanExtractedText(text: string): string {
    return text.replace(/\s+/g, ' ').trim();
  }

  // Função para obter o documento pelo ID (aceita tanto string quanto número)
  async getDocumentTextById(id: string | number) {
    const numericId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (isNaN(numericId)) {
      throw new Error('ID inválido');
    }

    return this.prisma.document.findUnique({
      where: { id: numericId },
    });
  }

  // Função para obter documentos de um usuário pelo ID
  async getDocumentsByUserId(userId: number) {
    return this.prisma.document.findMany({
      where: { userId },
    });
  }

  // Função para salvar o upload, extrair texto, e gerar explicação
  async saveUpload(fileName: string, filePath: string, userId: number) {
    // Salvar o arquivo no banco de dados
    const document = await this.prisma.document.create({
      data: {
        fileName,
        filePath,
        userId,
      },
    });

    // Executar OCR no arquivo
    const extractedText = await this.extractTextFromImage(filePath);

    // Limpar o texto extraído
    const cleanedText = this.cleanExtractedText(extractedText);

    // Enviar para o GPT para gerar uma explicação
    const explanation = await this.sendToGPT(cleanedText);

    // Atualizar o documento com o texto extraído e a explicação gerada
    const updatedDocument = await this.prisma.document.update({
      where: { id: document.id },
      data: {
        text: cleanedText,
        explanation: explanation, // Adiciona o texto gerado pelo GPT
      },
    });

    return updatedDocument;
  }

  // Função para extrair texto da imagem usando OCR
  private async extractTextFromImage(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      Tesseract.recognize(
        filePath,
        'por', // Usar o idioma correto (português no seu caso)
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

  // Função para enviar texto extraído para o GPT e obter uma explicação
  public async sendToGPT(extractedText: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('API Key não encontrada');
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // Ou 'gpt-4'
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

  // Função para fazer perguntas sobre o texto extraído do documento
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

    // Preparar o prompt para o GPT
    const prompt = `Texto do documento:\n${document.text}\n\nPergunta: ${question}`;
    const answer = await this.sendToGPT(prompt);

    return { answer };
  }
}
