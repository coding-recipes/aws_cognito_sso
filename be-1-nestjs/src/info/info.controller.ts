import { Controller, Get } from '@nestjs/common';

const serverInfo = {
  swagger: "/docs",
  framework: "NestJS",
  version: "0.0.1",
  language: "TypeScript",
}


@Controller('info')
export class InfoController {

  @Get("/server")
  async getServerInfo(): Promise<typeof serverInfo> {
    return serverInfo;
  }
}
