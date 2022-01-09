import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { UsersModule } from '../users';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from '../../constants';
import { AuthController } from './controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
