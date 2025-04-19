<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Paggo - OCR Case</h1>

<p align="center">
  Plataforma web para o <strong>Paggo - OCR Case</strong>, onde usuários podem fazer upload de documentos, visualizar o texto extraído via OCR, interagir com IA (GPT-4) e navegar por seu histórico.
</p>

---

## 🚀 Tecnologias Utilizadas

- ⚛️ **Next.js** (Frontend)
- 🎨 **TypeScript**
- 🧠 **Integração com GPT-4**
- 🔐 **JWT Authentication**
- 📄 **OCR (Extração de texto de documentos)**
- 🧬 **Prisma ORM** (Backend)
- ⚙️ **NestJS** (Backend)
- 📦 **Axios** (Comunicação frontend-backend)
- 📅 **API RESTful** (Frontend & Backend)
- 💻 **Vercel** (Frontend Deploy)
- 🌐 **Render** (Backend Deploy)
- 📚 **PostgreSQL** (Banco de Dados)

---

## 📦 Instalação e Setup

### 1. Clonar o repositório

```bash
git clone https://github.com/Leleo2009/paggo-ocr-case.git
cd paggo-ocr-case
```

### 2. Instalar dependências

#### No frontend:

```bash
cd frontend
npm install
```

#### No backend:

```bash
cd backend
npm install
```

### 3. Variáveis de Ambiente

Crie um arquivo `.env.local` no frontend e um `.env` no backend com o seguinte conteúdo:

#### Frontend (`.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Backend (`.env`):

```env
JWT_SECRET=sua_chave_jwt
DATABASE_URL=sua_url_postgresql
OPENAI_API_KEY=sua_chave_openai
```

---

### 4. Executar o projeto

#### Frontend:

```bash
cd frontend
npm run dev
```

#### Backend:

```bash
cd backend
npm run start:dev
```

---

## ⚙️ Funcionalidades

### Frontend

- 📁 Upload de documentos (PDF, PNG, JPG)
- 🧾 Visualização do texto extraído via OCR ou leitura direta de PDFs
- 🧠 Interação com IA (GPT-4): Explicações e perguntas baseadas no documento
- 🧑‍💼 Autenticação com JWT
- 📜 Histórico de documentos do usuário
- 📥 Download de documentos processados

### Backend

- 📄 Upload de documentos com OCR e extração de texto
- 🧠 Integração com IA: Explicação gerada pelo GPT-4
- 📋 Histórico de documentos: Acompanhamento de uploads e interações
- 🔐 Autenticação JWT para segurança de endpoints
- 🔄 API RESTful para comunicação entre frontend e backend
- 🧬 Prisma ORM para gerenciamento do banco de dados

---

## 📋 Endpoints

### Frontend

| Método | Rota                        | Descrição                                               |
|--------|-----------------------------|----------------------------------------------------------|
| POST   | `/document/upload`          | Envia documentos para o backend com OCR                  |
| GET    | `/document/:id/text`        | Exibe o texto extraído de um documento                   |
| GET    | `/document/:id/explain`     | Explicação gerada pela IA (GPT-4)                        |
| POST   | `/document/:id/ask`         | Perguntas e respostas baseadas no conteúdo do documento  |
| GET    | `/document/history`         | Exibe o histórico de documentos do usuário               |
| GET    | `/document/download/:id`    | Baixar documento original                                |

### Backend

| Método | Rota                        | Descrição                                               |
|--------|-----------------------------|----------------------------------------------------------|
| POST   | `/document/upload`          | Upload de documentos com OCR                            |
| GET    | `/document/:id/text`        | Retorna o texto extraído do documento                   |
| GET    | `/document/:id/explain`     | Retorna a explicação gerada pela IA (GPT-4)             |
| POST   | `/document/:id/ask`         | Permite perguntas e respostas baseadas no documento     |
| GET    | `/document/history`         | Exibe o histórico de documentos do usuário              |
| POST   | `/auth/login`               | Geração de token JWT para autenticação                  |
| GET    | `/users`                    | Lista todos os usuários                                 |

---

## 🧪 Testes

Você pode testar as rotas utilizando ferramentas como **Insomnia** ou **Postman**.

---

## 🚀 Deploy

### Frontend:

O frontend está hospedado no Vercel.  
🔗 [**Acesse aqui a versão online**](https://project-paggo-ocr-up.vercel.app)

### Backend:

O backend está hospedado no Render.  
🔗 [**API disponível aqui**](https://project-paggo-ocr-up.onrender.com)

> ⚠️ Observação: A URL do backend retorna apenas a base da API. Utilize via requisições HTTP no frontend ou via ferramentas como Postman.

---

## 📚 Recursos Adicionais

- [📘 Documentação Next.js](https://nextjs.org/docs)
- [📘 Documentação Prisma](https://www.prisma.io/docs)
- [📘 OpenAI GPT-4](https://platform.openai.com/docs)
- [📘 Documentação NestJS](https://docs.nestjs.com)
- [📘 JWT.io](https://jwt.io)
- [🌐 Render](https://render.com)
- [🌐 Vercel](https://vercel.com)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.  
Feito com 💻 por [Leleo2009](https://github.com/Leleo2009)