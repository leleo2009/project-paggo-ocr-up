declare global {
  namespace Express {
    interface Request {
      user?: any; // Adicione a tipagem correta aqui, se necessário
    }
  }
}
