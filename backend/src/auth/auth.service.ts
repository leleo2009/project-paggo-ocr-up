// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; 
import { JwtPayload } from './interfaces/jwt-payload.interface'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Método para verificar o usuário e gerar o JWT
  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    console.log('Usuário encontrado:', user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Comparando a senha sem criptografia
    console.log('Senha enviada:', password);
    console.log('Senha do banco:', user.password);

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Exclui o campo 'password' antes de retornar o usuário
    const { password: userPassword, ...userWithoutPassword } = user;

    const payload: JwtPayload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword, // Retorna o usuário sem a senha
    };
  }
}
