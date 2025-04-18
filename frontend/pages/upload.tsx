// pages/upload.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import FileUpload from '@/components/FileUpload';

const UploadPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Verifica se o token está no localStorage
    const token = localStorage.getItem('token');

    // Se o token não for encontrado, ou for inválido, redireciona para o login
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div>
      <FileUpload />
    </div>
  );
};

export default UploadPage;
