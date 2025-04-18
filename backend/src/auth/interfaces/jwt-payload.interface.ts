// src/auth/interfaces/jwt-payload.interface.ts

export interface JwtPayload {
  email: string;
  sub: number; // O ID do usuário, que deve ser um número
}
