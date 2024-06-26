import { Controller, Post, Body,Param ,Get, Patch, Delete } from '@nestjs/common';
import { CourtsService } from '../service/courts.service';
import { CreateCourtsDTO } from '../dto/create-courts.dto';
import { UpdateCourtsDTO } from '../dto/update-courts.dto';

@Controller('courts')
export class CourtsController{
constructor (private readonly courtsService: CourtsService){}
@Post()
create(@Body()createCrountsDTO: CreateCourtsDTO){
    return this.courtsService.create(createCrountsDTO)
}

@Get()
findAll() {
  return this.courtsService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string) {
   return this.courtsService.findOne(id);
}

@Patch(':id')
    update(@Param('id') id: string, @Body() updateCourtsDto: UpdateCourtsDTO) {
      return this.courtsService.update(id, updateCourtsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.courtsService.remove(id);
    }


}