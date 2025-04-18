// src/@types/express/index.d.ts

import { UserFromJwt } from '../../auth/types'; // ou defina o tipo correto do seu JWT

declare global {
  namespace Express {
    interface Request {
      user?: UserFromJwt; // Altere para o tipo correto do seu JWT, ou `any` pra testar
    }
  }
}
