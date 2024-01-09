import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, ValidationPipeOptions, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  Logger.log(`environment: ${process.env.NODE_ENV?.toUpperCase()}`, 'Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI });

  const validationPipeOptions: ValidationPipeOptions = {
    disableErrorMessages: false,
    enableDebugMessages: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  };
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));

  const config = new DocumentBuilder()
    .setTitle('Location API')
    .setDescription('Location API')
    .setVersion('1.0')
    .setContact('Ismaias Moreira', 'https://github.com/Ismaias', '')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
