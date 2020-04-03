import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import {
  Transport,
  MicroserviceOptions,
} from '@nestjs/microservices';
import { AppModule } from './app.module';
import { UsersModule } from './users-microservice/users.module';
import { microserviceOptions } from './app.controller';

export const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    microserviceOptions,
  );
  await microservice.listen(() => {
    logger.log('Microservice started...')
  });
  await app.listen(3000, () => {
    logger.log('Server started...')
  })
}
bootstrap()
