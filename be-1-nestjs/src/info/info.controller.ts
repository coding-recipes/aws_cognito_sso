import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
class ServerInfo {
  @ApiProperty({ example: '/docs' })
  swagger: string = "/docs"
  @ApiProperty({ example: 'NestJS' })
  framework: string = "NestJS"
  @ApiProperty({ example: '0.0.1' })
  version: string = "0.0.1"
  @ApiProperty({ example: 'TypeScript' })
  language: string = "TypeScript"
}

@Controller('info')
export class InfoController {

  @Get("/server")
  @ApiCreatedResponse({ type: ServerInfo })
  async getServerInfo(): Promise<ServerInfo> {
    return new ServerInfo()
  }
}
