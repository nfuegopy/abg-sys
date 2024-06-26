import {Module} from '@nestjs/common';
import {CourtsService} from '../service/courts.service';
import {CourtsController} from '../controller/courts.controller';

@Module({
    providers: [CourtsService],
    controllers: [CourtsController],
    exports: [CourtsService],  // Exporta el servicio si otros módulos lo necesitan
  
})
  export class CourtsModule {}
  