import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuditController } from './audit.controller';

@Module({
  imports: [],
  controllers: [AppController, AuditController],
  providers: [AppService],
})
export class AppModule {}
