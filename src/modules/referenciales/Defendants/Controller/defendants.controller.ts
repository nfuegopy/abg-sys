import { Controller, Post, Body,Param ,Get, Patch, Delete } from '@nestjs/common';
import { DefendantsService } from '../Service/defendants.service';
import { CreateDefendantsDTO } from '../Dto/create-defendants.dto';
import { UpdateDefendantsDTO } from '../Dto/update-defendants.dto';

@Controller('defendants')
export class DefendantsController{
    constructor(private readonly defendantsService: DefendantsService) {}
    @Post()
    create(@Body() createDefendantsDto: CreateDefendantsDTO) {
      return this.defendantsService.create(createDefendantsDto);
    }
  
//Sintaxis para utilizar  la inserccion de varios registros a la vez
@Post('batch')
createMultiple(@Body() createDefendantsDtos: CreateDefendantsDTO[]) {
  return this.defendantsService.createMultiple(createDefendantsDtos);
}
//Solo es un codigo de prueba 
    @Get()
    findAll() {
      return this.defendantsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
       return this.defendantsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDefendantsDto: UpdateDefendantsDTO) {
      return this.defendantsService.update(id, updateDefendantsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.defendantsService.remove(id);
    }


}