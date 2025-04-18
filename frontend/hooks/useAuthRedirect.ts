import { useEffect } from 'react';
import { useRouter } from 'next/router';
const jwt_decode = require('jwt-decode');

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decoded: any = jwt_decode(token);
      const expirationDate = decoded?.exp * 1000;

      if (expirationDate < Date.now()) {
        localStorage.removeItem('token');
        router.push('/login');
      }
    } catch (err) {
      console.error('Erro ao decodificar token:', err);
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);
};

export default useAuthRedirect;
