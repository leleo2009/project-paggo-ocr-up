const bcrypt = require('bcryptjs');

const password = 'senha123'; // Sua senha de teste
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.error('Erro:', err);
    return;
  }
  console.log('Novo hash gerado:', hashedPassword);
});
