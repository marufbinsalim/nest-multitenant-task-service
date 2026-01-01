/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AUDIT_PACKAGE_NAME } from '../../../types/proto/audit';
import { join } from 'path';

async function bootstrap() {
  const port = process.env.GRPC_PORT || 50051;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: AUDIT_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/audit.proto'),
      url: `0.0.0.0:${port}`,
    }
  });
  await app.listen();

  Logger.log(`Microservice is listening on GRPC channel at port ${port}`);

}

bootstrap();
