import {Module} from '@nestjs/common';
import {ClientsService} from '../Service/clients.service';
import {ClientsController} from '../Controller/clients.controller';

@Module({
    providers: [ClientsService],
    controllers: [ClientsController],
    exports: [ClientsService],  // Exporta el servicio si otros módulos lo necesitan
  
})
  export class ClientsModule {}
  