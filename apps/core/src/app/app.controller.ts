import { Body, Controller, Post } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { CreateAuditDto } from './dto/create-audit.dto';

@Controller()
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post()
  async createAudit(@Body() dto: CreateAuditDto) {
    const producer = this.kafkaService.getProducer();
    await producer.send({
      topic: 'audit-events',
      messages: [
        {
          value: JSON.stringify({
            auditId: "rxbxzac",
            message: dto.message,
            timestamp: new Date().toISOString(),
          }),
        },
      ],
    });
    return { message: 'Audit event sent to Kafka' };
  }
}
