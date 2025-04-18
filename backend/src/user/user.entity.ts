import { Document } from '@prisma/client'; // Importando a relação com Document

export class User {
  id: number;
  email: string;
  password: string;
  name: string;
  documents: Document[]; // Relacionamento com documentos
}
