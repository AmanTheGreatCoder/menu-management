import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { BadRequestException } from './lib/exceptions/bad-request.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('NestApplication');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErros: ValidationError[] = []) => {
        const errors = {};
        const error = validationErros[0];
        if (error && error.constraints) {
          errors[error.property] = Object.values(error.constraints)[0];
        }

        logger.error(errors);
        logger.error(validationErros);

        return new BadRequestException('Validation failed', errors);
      },
    }),
  );

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Swagger API')
      .addServer('http://localhost:8000', 'Local')
      .build(),
  );
  SwaggerModule.setup('/docs', app, document);

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new ResponseInterceptor(),
  );

  await app.listen(process.env.PORT);
}
bootstrap();
