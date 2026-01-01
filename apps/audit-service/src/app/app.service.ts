import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {

  // New method to process audit events
  processAudit(auditEvent: { message: string; [key: string]: any }) {
    // Extract number from message, if any
    const match = auditEvent.message?.match(/-?\d+/);
    const extractedNumber = match ? Number(match[0]) : null;

    // Example: log the audit event
    Logger.log(
      `Audit processed @ ${new Date().toISOString()} with message: '${auditEvent.message}', extractedNumber: ${extractedNumber}`,
    );

    // You can extend this: save to DB, call another service, etc.
  }
}
