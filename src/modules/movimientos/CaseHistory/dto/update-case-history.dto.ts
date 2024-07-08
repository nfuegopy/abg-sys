// src/modules/Movimientos/CaseHistory/Dto/update-case-history.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCaseHistoryDTO } from './create-case-history.dto';

export class UpdateCaseHistoryDTO extends PartialType(CreateCaseHistoryDTO) {}