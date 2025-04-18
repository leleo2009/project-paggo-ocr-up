import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule, // Importa aqui
    JwtModule.register({
      secret: 'Qy9fW2sL@8nJp#4rXt!7zDhUvE3cMk2G',
      signOptions: { expiresIn: '15m' },
    }),
    PrismaModule,
  ],
  providers: [AuthService, UserService, JwtStrategy], // Adiciona JwtStrategy
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
