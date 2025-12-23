import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function initDocs(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Api Docs for nest-multitenant-task-service')
    .setVersion('1.0')
    .build()

  const document = () => SwaggerModule.createDocument(app, config)
  /* ... */
  const { apiReference } = await import('@scalar/nestjs-api-reference');

  app.use(
    '/references',
    apiReference({
      content: document,
    }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await initDocs(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
