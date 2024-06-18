import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable validation pipe
  app.useGlobalPipes(new ValidationPipe());

  //Enable compression
  app.use(compression());

  // Enable helmet
  app.use(helmet());

  // Enable CORS
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('Demo API description')
    .setVersion('1.0')
    .addTag('Backend')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);
}
bootstrap();
