import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/History.module.css';

interface Document {
  id: number;
  fileName: string;
  filePath: string;
  text: string;
  explanation: string;
}

const History: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/document/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Erro ao buscar documentos');
        }

        const data = await res.json();
        setDocuments(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar documentos');
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [router]);

  const handleViewDocument = (id: number) => {
    router.push(`/document/${id}`);
  };

  const handleDownload = async (fileId: number, fileName: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/document/download/${fileId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Erro ao fazer download do documento');
      }
  
      const fileBlob = await response.blob();
      const fileURL = window.URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = fileURL;
  
      // Garante que o nome do arquivo termine com '.pdf'
      const downloadFileName = fileName.toLowerCase().endsWith('.pdf') ? fileName : `${fileName}.pdf`;
      link.download = downloadFileName;
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao fazer download:', error);
      alert('Erro ao fazer download do arquivo');
    }
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Histórico de Documentos</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {documents.length === 0 && !loading && <p>Você ainda não fez upload de nenhum documento.</p>}

      <ul className={styles.documentList}>
        {documents.map((doc) => (
          <li key={doc.id} className={styles.documentItem}>
            <h2>{doc.fileName}</h2>
            <p>{doc.text}</p>
            <div className={styles.buttons}>
              <button onClick={() => handleViewDocument(doc.id)} className={styles.viewButton}>
                Ver Detalhes
              </button>
              <button onClick={() => handleDownload(doc.id, doc.fileName)} className={styles.downloadButton}>
                Baixar Documento
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
