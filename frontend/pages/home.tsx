// frontend/pages/home.tsx
import Link from 'next/link';
import styles from './styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo ao OCR App</h1>
      <p className={styles.description}>Extraia texto de documentos com facilidade.</p>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>
          <Link href="/login">Login</Link>
        </button>
        <button className={styles.button}>
          <Link href="/register">Cadastrar</Link>
        </button>
      </div>
    </div>
  );
}
