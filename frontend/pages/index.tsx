// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/Home.module.css';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/upload'); // Se já houver token, redireciona para a página de upload
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo ao OCR App</h1>
      <p className={styles.description}>Extraia texto de documentos com facilidade.</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => router.push('/login')}>
          Login
        </button>
        <button className={styles.button} onClick={() => router.push('/register')}>
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default HomePage;
