import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

import { MailModule } from '../mail/mail.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';

@Module({
  imports: [
    PassportModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        privateKey: configService
          .getOrThrow('auth.privateKey', {
            infer: true,
          })
          .replace(/\\\\n/gm, '\\n'),
        publicKey: configService
          .getOrThrow('auth.publicKey', {
            infer: true,
          })
          .replace(/\\\\n/gm, '\\n'),
        signOptions: {
          expiresIn: configService.getOrThrow('auth.expires', {
            infer: true,
          }),
          algorithm: 'RS256',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
