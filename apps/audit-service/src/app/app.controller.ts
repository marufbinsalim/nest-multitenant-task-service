import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, KafkaContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Kafka event handler
  @EventPattern('audit-events') // topic name
  handleAuditEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
    Logger.log('Received audit event:', message);
    this.appService.processAudit(message);
  }
}
