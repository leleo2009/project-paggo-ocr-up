// src/user/user.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';  // Importando PrismaService
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Método para criar um usuário sem criptografar a senha
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verifica se já existe um usuário com o e-mail fornecido
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      // Lançar um erro de conflito se o email já estiver em uso
      throw new ConflictException('Email already in use');
    }

    // Se o e-mail não existir, cria o usuário com a senha em texto simples
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: createUserDto.password, // Armazenando a senha sem criptografia
      },
    });
  }

  // Método para atualizar um usuário
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Método para buscar um usuário por ID
  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  // Método para encontrar todos os usuários
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  // Método para encontrar um usuário pelo email
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  // Método para remover um usuário
  async remove(id: number): Promise<User | null> {
    return this.prisma.user.delete({
      where: {
        id: Number(id),  // Conversão para inteiro
      },
    });
  }
}
