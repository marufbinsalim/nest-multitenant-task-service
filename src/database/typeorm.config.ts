import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.enitity";

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        ssl: {
            rejectUnauthorized: false,
        },
        entities: [Users],
        autoLoadEntities: true,
        synchronize: true,
    })
}