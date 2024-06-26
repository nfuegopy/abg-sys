import {Module} from '@nestjs/common';
import {DefendantsService} from '../Service/defendants.service';
import {DefendantsController} from '../Controller/defendants.controller';

@Module({
    providers: [DefendantsService],
    controllers: [DefendantsController],
    exports: [DefendantsService],  // Exporta el servicio si otros módulos lo necesitan
  
})
  export class DefendantsModule {}
  