import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import * as path from "path";

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: {
            rejectUnauthorized: false,
        },
        entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
        autoLoadEntities: true,
        synchronize: true,
    })
}