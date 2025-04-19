<p align="center"> <a href="https://nextjs.org/" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="160" alt="Next.js Logo" /> </a> </p> <h1 align="center">Paggo - OCR Case (Frontend)</h1> <p align="center"> Interface web para o <strong>Paggo - OCR Case</strong>, onde usuários podem fazer upload de documentos, visualizar o texto extraído via OCR, interagir com IA (GPT-4) e navegar por seu histórico. </p>
🚀 Visão Geral do Projeto
Paggo - OCR Case é uma plataforma que permite aos usuários fazer upload de documentos, como imagens (PNG, JPG) e PDFs, para extrair texto usando OCR. Além disso, o sistema oferece uma interação com a IA (GPT-4) para gerar explicações e responder a perguntas com base nos textos extraídos dos documentos. O projeto é composto por um backend desenvolvido com NestJS e um frontend em Next.js.

🌐 Tecnologias Utilizadas
⚛️ Next.js (Frontend)

🎨 TypeScript

💅 Tailwind CSS

🔐 JWT (Autenticação)

🔄 Integração com Backend NestJS

📄 OCR (Extração de texto de documentos)

🤖 Integração com GPT-4

🧬 PostgreSQL (Banco de dados)

🛠️ Estrutura do Projeto
Backend (NestJS)
src/: Código-fonte principal.

auth/: Módulo de autenticação (login, JWT).

document/: Módulo que lida com upload, extração de texto e download de documentos.

prisma/: Arquivos relacionados ao Prisma ORM (modelo de dados e migrações).

Frontend (Next.js)
pages/: Páginas principais do site, como upload e visualização.

components/: Componentes reutilizáveis (ex: Formulários, Botões, etc.).

styles/: Estilos do projeto, utilizando Tailwind CSS.

✨ Funcionalidades Principais
📁 Upload de documentos (PDF, PNG, JPG)

🧾 Visualização do texto extraído

🧠 Explicações interativas com GPT-4

🧑‍💼 Autenticação com JWT

📜 Histórico de documentos

📥 Download do conteúdo processado: Geração de PDF contendo o texto extraído e explicações da IA.

🧑‍💻 Como Funciona o Processo
Upload de Documento: O usuário faz upload de um arquivo (PDF ou imagem).

Extração de Texto: O backend utiliza OCR para extrair o texto do arquivo.

Interação com IA: O GPT-4 é utilizado para gerar explicações sobre o texto extraído.

Download de PDF: O usuário pode baixar um PDF gerado contendo o texto extraído e as explicações da IA.

⚙️ Setup do Projeto
1. Instalar Dependências

npm install

2. Rodar o Projeto
Desenvolvimento

npm run build
npm start

🔑 Autenticação com JWT
O processo de autenticação é realizado via JWT (JSON Web Token). Para obter um token JWT, o usuário deve fazer login no sistema. Esse token é então utilizado para autenticar requisições no backend.

🚀 Deploy
O projeto está disponível online através do Vercel. O frontend foi deployado na seguinte URL:

🔗 Frontend Online (Vercel)

📄 Licença
Este projeto está licenciado sob a MIT License.