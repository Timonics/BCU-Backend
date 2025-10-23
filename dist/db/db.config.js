"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
exports.typeOrmConfig = {
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        return {
            type: 'postgres',
            url: isProduction ? configService.get('DB_URL') : undefined,
            host: isProduction
                ? configService.get('DB_HOST') ?? 'aws-1-eu-north-1.pooler.supabase.com'
                : 'localhost',
            port: parseInt(configService.get('DB_PORT') || '5432', 10),
            username: configService.get('DB_USERNAME') || 'postgres',
            password: isProduction
                ? configService.get('DB_PASSWORD')
                : 'Oladotun1',
            database: isProduction
                ? configService.get('DB_NAME') ?? 'postgres'
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
//# sourceMappingURL=db.config.js.map