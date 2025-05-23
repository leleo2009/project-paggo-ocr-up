import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from './FileUpload.module.css';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Novo estado
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      return alert('Selecione um arquivo primeiro');
    }

    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para fazer o upload!');
      return;
    }

    try {
      setIsLoading(true); // Começa o loading

      const response = await fetch('https://project-paggo-ocr-up.onrender.com/document/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro no backend:', errorData);
        throw new Error(errorData.message || 'Erro desconhecido ao enviar o arquivo');
      }

      const data = await response.json();
      console.log('Resposta do backend:', data);

      alert('Arquivo enviado com sucesso!');
      if (data.id) {
        router.push(`/document/${data.id}`);
      } else {
        alert('ID do documento não retornado pelo backend');
      }
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err);
      alert('Erro ao enviar o arquivo');
    } finally {
      setIsLoading(false); // Finaliza o loading
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Bem-vindo ao sistema de Upload!</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="fileUpload" className={styles.label}>Escolha um arquivo:</label>
        <input
          id="fileUpload"
          type="file"
          onChange={handleFileChange}
          className={styles.input}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
      <div className={styles.linkContainer}>
        <Link href="/history" className={styles.link}>
          Ver Histórico
        </Link>
      </div>
    </div>
  );
};

export default FileUpload;
