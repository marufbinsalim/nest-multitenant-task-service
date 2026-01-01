import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        clientId: 'audit-service',
      },
      consumer: {
        groupId: 'audit-group',
      },
    },
  });

  await app.listen();
  Logger.log('Kafka microservice is listening...');
}

bootstrap();
