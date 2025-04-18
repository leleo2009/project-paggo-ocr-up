import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './DocumentText.module.css';
import Link from 'next/link';

const DocumentText: React.FC = () => {
  const [text, setText] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [textRes, explainRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/document/${id}/text`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/document/${id}/explain`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        if (!textRes.ok || !explainRes.ok) {
          throw new Error('Erro ao buscar dados');
        }

        const textData = await textRes.json();
        const explainData = await explainRes.json();

        setText(textData.text);
        setExplanation(explainData.explanation);
        setError(null);
      } catch (error) {
        console.error(error);
        setError('Erro ao buscar os dados');
      } finally {
        setLoading(false);
      }
    };

    if (typeof id === 'string') {
      fetchData();
    }
  }, [id]);

  const handleQuestionSubmit = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/document/${id}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error('Erro ao fazer a pergunta');
      }

      const data = await res.json();
      setResponse(data.answer);
    } catch (error) {
      console.error(error);
      setError('Erro ao obter resposta');
    }
  };

  const cleanText = (text: string) => {
    return text
      .replace(/(\s{2,})/g, ' ')
      .replace(/[\n\r]+/g, ' ')
      .replace(/[^a-zA-Z0-9.,;!?áéíóúàèìòùãõâêîôûäëïöüçÇ\s]/g, '');
  };

  const formatTextAsParagraphs = (text: string): React.ReactNode[] =>
    text.split('.').map((sentence, index) => <p key={index}>{sentence.trim()}.</p>);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Texto Extraído do Documento</h1>
      {loading && <p className={styles.loading}>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {text && (
        <div className={styles.textBlock}>
          {formatTextAsParagraphs(cleanText(text))}
        </div>
      )}
      {explanation && (
        <>
          <h2 className={styles.subheading}>Explicação</h2>
          <p className={styles.explanation}>{explanation}</p>
        </>
      )}

      {/* Input para enviar pergunta */}
      <div className={styles.questionBlock}>
        <h3 className={styles.questionHeading}>Pergunte ao GPT sobre o conteúdo</h3>
        <textarea
          className={styles.questionInput}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Digite sua pergunta aqui..."
        />
        <button onClick={handleQuestionSubmit} className={styles.askButton}>Perguntar</button>
      </div>

      {/* Exibe a resposta do GPT */}
      {response && (
        <div className={styles.responseBlock}>
          <h3 className={styles.responseHeading}>Resposta do GPT:</h3>
          <p>{response}</p>
        </div>
      )}

      <Link href="/history" className={styles.backLink}>
        Voltar para o Histórico de Documentos
      </Link>
    </div>
  );
};

export default DocumentText;
