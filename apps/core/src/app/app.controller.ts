import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { AUDIT_PACKAGE_NAME, AUDIT_SERVICE_NAME, AuditServiceClient } from 'types/proto/audit';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateAuditDto } from './dto/create-audit.dto';

@Controller()
export class AppController implements OnModuleInit {
  private auditService: AuditServiceClient;
  constructor(@Inject(AUDIT_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.auditService = this.client.getService<AuditServiceClient>(AUDIT_SERVICE_NAME);
  }
  
  @Post()
  createAudit(@Body() dto: CreateAuditDto) {
    return this.auditService.addAudit({
      auditId: "rxbxzac", 
      message: dto.message,
    });
  }
}
