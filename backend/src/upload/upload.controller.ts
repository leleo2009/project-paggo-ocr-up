import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  BadRequestException,
  NotFoundException,
  Request,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadService } from './upload.service';
import { Response } from 'express';
import * as fs from 'fs/promises';
import { resolve, join } from 'path';
import * as PDFDocument from 'pdfkit';

@Controller('document')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload', // Caminho onde os arquivos serão armazenados
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req: Request) {
    const expressReq = req as unknown as import('express').Request;
    const userId = expressReq.user?.sub;

    if (!userId || typeof userId !== 'number') {
      throw new BadRequestException('ID do usuário inválido');
    }

    const savedDocument = await this.uploadService.saveUpload(
      file.originalname,
      file.path,
      userId,
    );

    return {
      message: 'Arquivo salvo com sucesso!',
      id: savedDocument.id,
    };
  }

  @Get(':id/text')
  async getDocumentText(@Param('id') id: string) {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new BadRequestException('ID deve ser um número válido');
    }

    const document = await this.uploadService.getDocumentTextById(numericId);
    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    return { text: document.text };
  }

  @Get(':id/explain')
  @UseGuards(JwtAuthGuard)
  async explainDocument(@Param('id') id: string) {
    const document = await this.uploadService.getDocumentTextById(Number(id));
    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    if (!document.text) {
      throw new NotFoundException('Texto do documento não encontrado');
    }

    const explanation = await this.uploadService.sendToGPT(document.text);

    return { explanation };
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  async getUserDocuments(@Request() req: Request) {
    const expressReq = req as unknown as import('express').Request;
    const userId = expressReq.user?.sub;

    if (!userId) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const documents = await this.uploadService.getDocumentsByUserId(userId);

    if (!documents || documents.length === 0) {
      throw new NotFoundException('Nenhum documento encontrado');
    }

    return documents;
  }

  @Post(':id/ask')
  @UseGuards(JwtAuthGuard)
  async askDocumentQuestion(
    @Param('id') id: string,
    @Body('question') question: string,
    @Request() req: Request,
  ) {
    const expressReq = req as unknown as import('express').Request;
    const userId = expressReq.user?.sub;

    const result = await this.uploadService.askQuestionToGPT(+id, question, userId);
    return result;
  }

  @Get('download/:id')
  async downloadDocument(@Param('id') id: number, @Res() res: Response) {
    const document = await this.uploadService.getDocumentTextById(id);

    if (!document) {
      throw new NotFoundException('Documento não encontrado');
    }

    // Cria um novo documento PDF
    const doc = new PDFDocument();

    // Configura os headers da resposta
    res.setHeader('Content-Disposition', `attachment; filename="${document.fileName}.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');

    // Envia o PDF como resposta
    doc.pipe(res);

    // Adiciona o conteúdo extraído
    doc.fontSize(14).text('Conteúdo Extraído:', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(document.text || 'Sem conteúdo disponível.');
    doc.moveDown();

    // Adiciona a explicação
    doc.fontSize(14).text('Explicação:', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(document.explanation || 'Sem explicação disponível.');

    // Finaliza o documento PDF
    doc.end();
  }
}
