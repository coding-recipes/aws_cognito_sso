import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SwaggerConfig } from './config'
import { INestApplication } from '@nestjs/common';

export const setupSwagger = (app: INestApplication, swaggerConfig: SwaggerConfig) => {
  const s = swaggerConfig;

  let b = new DocumentBuilder()
    .setTitle(s.title)
    .setDescription(s.description)
    .setVersion(s.version)

  b = s.contact ? b.setContact(s.contact.name, s.contact.url, s.contact.email) : b

  s.tags.forEach(tag => {
    b = b.addTag(tag.name, tag.description)
  })

  const config = b.build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(s.route, app, document);
}