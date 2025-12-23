import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';

@Module({})
export class TenantModule {
    providers: [TenantService];
}
