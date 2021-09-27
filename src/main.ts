import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

function configSwagger(app) {
  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Cinema Plus API documents')
      .setDescription(
        'API using for all device android is intalled app CinemaPlus.',
      )
      .setVersion('2.0')
      .addServer(process.env.LINK_LOCAL_DEV)
      .addServer(process.env.LINK_PRODUCT)
      .build();

    const doc = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('api', app, doc);
  }
}

async function bootstrap() {  
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.use(morgan('dev'));

  configSwagger(app);

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
