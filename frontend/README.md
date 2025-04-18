<p align="center">
  <a href="https://nextjs.org/" target="_blank">
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" width="160" alt="Next.js Logo" />
  </a>
</p>

<h1 align="center">Paggo - OCR Case (Frontend)</h1>

<p align="center">
  Interface web para o <strong>Paggo - OCR Case</strong>, onde usuários podem fazer upload de documentos, visualizar o texto extraído via OCR, interagir com IA (GPT-4) e navegar por seu histórico.
</p>

---

## 🌐 Tecnologias Utilizadas

- ⚛️ **Next.js**
- 🎨 **TypeScript**
- 💅 **Tailwind CSS**
- 🔐 **JWT (Autenticação)**
- 🔄 **Integração com Backend NestJS**
- 📄 **Upload de arquivos**
- 🤖 **Integração com GPT-4**

---

## ⚙️ Setup do Projeto

### 1. Instalar dependências

```bash
npm install

2. Rodar o projeto
Desenvolvimento

npm run dev

Produção (build)

npm run build
npm start

3. Variáveis de Ambiente
Crie um arquivo .env.local na raiz do projeto com o seguinte conteúdo:

NEXT_PUBLIC_API_URL=http://localhost:3001

Altere para a URL do backend em produção quando necessário (ex: via Railway, Render, etc.).

✨ Funcionalidades Principais
📁 Upload de documentos (PDF, PNG, JPG)

🧾 Visualização do texto extraído

🧠 Explicações interativas com GPT-4

🧑‍💼 Autenticação com JWT

📜 Histórico de documentos

📥 Download do documento original

🧪 Testando
A interface está conectada com o backend e pode ser testada localmente com localhost:3001 ou via deploy online (como no Vercel).

🚀 Deploy
Deploy realizado com sucesso utilizando Vercel:

🔗 Acesse: Frontend Online (Vercel)

🧠 Recursos Adicionais
Documentação Next.js

Tailwind CSS

Vercel

JWT.io

📄 Licença
Este projeto está licenciado sob a MIT License.
