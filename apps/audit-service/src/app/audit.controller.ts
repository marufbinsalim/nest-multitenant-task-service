import { Controller } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
    AuditRequest,
    AuditResponse,
    AuditServiceController,
    AuditServiceControllerMethods,
} from 'types/proto/audit';

@Controller()
@AuditServiceControllerMethods()
export class AuditController implements AuditServiceController {
    addAudit(
        request: AuditRequest,
    ): AuditResponse | Promise<AuditResponse> | Observable<AuditResponse> {

        if (!request.message) {
            throw new RpcException('message is required');
        }


        const match = request.message?.match(/-?\d+/);
        const extractedNumber = match ? Number(match[0]) : null;

        return {
            auditId: request.auditId,
            message: `Audit received @ ${new Date().toISOString()} with message: '${request.message}'`,
            extractedNumber,
        };
    }
}
