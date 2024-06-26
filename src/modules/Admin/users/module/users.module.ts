//  se crea el module para ser utilizado dentro de superadmin
import { Module } from "@nestjs/common";
import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}