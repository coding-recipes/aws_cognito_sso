import { Controller, Get } from '@nestjs/common';

const rootMessage = "API is running"

@Controller()
export class AppController {

  @Get("/")
  async getRoot(): Promise<typeof rootMessage> {
    return rootMessage;
  }
}
