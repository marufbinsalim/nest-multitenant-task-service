import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUDIT_PACKAGE_NAME } from '../../../../types/proto/audit';
import { join } from 'path';


@Module({
  imports: [ClientsModule.register([
    {
      name: AUDIT_PACKAGE_NAME,
      transport: Transport.GRPC,
      options: {
        package: AUDIT_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/audit.proto'),
      },
    },
  ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
