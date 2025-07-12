import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './db/db.config';
import { MemberModule } from './member/member.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard/auth.guard';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { BandModule } from './band/band.module';
import { UnitModule } from './unit/unit.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AdminModule,
    MemberModule,
    AuthModule,
    BandModule,
    UnitModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}
