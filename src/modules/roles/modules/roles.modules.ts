//  se crea el module para ser utilizado dentro de superadmin
import { Module } from "@nestjs/common";
import { RolesService } from '../service/roles.service';
import { RolesController } from '../controller/roles.controller';

@Module({
    providers: [RolesService],
    controllers: [RolesController],
})
export class RolesModule {}