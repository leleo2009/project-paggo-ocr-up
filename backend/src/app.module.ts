// src/app.module.ts
import { Module, Global } from '@nestjs/common';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    UserModule,
    PrismaModule,
    UploadModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
    // DocumentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
