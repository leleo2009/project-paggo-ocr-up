<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Paggo - OCR Case (Backend)</h1>

<p align="center">
  Plataforma backend para o <strong>Paggo - OCR Case</strong>, responsável por realizar upload de documentos, extração de texto via OCR e interação com IA (GPT-4).
</p>

---

## 🚀 Tecnologias Utilizadas

- ⚙️ **NestJS**
- 🟨 **TypeScript**
- 🔐 **JWT Authentication**
- 🧠 **GPT-4 (Integração com IA)**
- 📄 **OCR (Extração de texto de documentos)**
- 🧬 **Prisma ORM**
- 🔗 **API RESTful**

---

## 📦 Instalação e Setup

### 1. Instalar dependências
```bash
npm install

2. Executar o projeto
Desenvolvimento

npm run start:dev

Produção

npm run start:prod

3. Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

NEXT_PUBLIC_API_URL=http://localhost:3001
JWT_SECRET=your_jwt_secret
DATABASE_URL=your_database_url
OPENAI_API_KEY=sua-chave-da-openai

📌 Principais Rotas

Método	Rota	Descrição
POST	/document/upload	Upload de documentos com OCR
GET	/document/:id/text	Exibe o texto extraído do documento
GET	/document/:id/explain	Explicação gerada pela IA (GPT-4)
POST	/document/:id/ask	Perguntas e respostas com base no documento
GET	/document/history	Lista o histórico de documentos do usuário
GET	/document/download/:id	Faz download do documento original
POST	/auth/login	Autenticação e geração de token JWT
GET	/users	Lista todos os usuários
🔍 Testes via Insomnia/Postman
Você pode testar as rotas utilizando ferramentas como Insomnia ou Postman.

⚠️ A integração com o frontend já está funcional e conectada ao backend.

🚀 Deploy
O projeto pode ser facilmente implantado utilizando Vercel, Render, Railway, Heroku ou qualquer outro serviço que suporte aplicações Node.js.

📚 Recursos Adicionais
Documentação NestJS

Documentação Prisma

OpenAI GPT-4

📄 Licença
Este projeto está licenciado sob a MIT License.