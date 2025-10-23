import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const isProduction = configService.get<string>('NODE_ENV') === 'production';

    return {
      type: 'postgres',
      url: isProduction ? configService.get<string>('DB_URL') : undefined,
      host: isProduction
        ? configService.get<string>('DB_HOST') ?? 'aws-1-eu-north-1.pooler.supabase.com'
        : 'localhost',
      port: parseInt(configService.get<string>('DB_PORT') || '5432', 10),
      username: configService.get<string>('DB_USERNAME') || 'postgres',
      password: isProduction
        ? configService.get<string>('DB_PASSWORD')
        : 'Oladotun1',
      database: isProduction
        ? configService.get<string>('DB_NAME') ?? 'postgres'
        : 'BCU',

      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],

      synchronize: !isProduction,
      autoLoadEntities: true,
      poolSize: 10,
      retryAttempts: 3,
      retryDelay: 3000,
    };
  },
};
