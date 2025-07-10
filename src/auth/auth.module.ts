import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { AuthController } from './auth.controller';
import { config } from 'dotenv';
import { AuthService } from './auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { JwtGuard } from './guard/auth.guard';

config()

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AdminModule
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtGuard],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
