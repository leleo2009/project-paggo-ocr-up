import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/Login.module.css'; // Importando o CSS modular

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.access_token); // Salva token real
      router.push('/upload'); // Redireciona após login
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      alert('Credenciais inválidas. Tente novamente!');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
