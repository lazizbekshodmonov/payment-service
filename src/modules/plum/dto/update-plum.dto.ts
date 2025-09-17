import { PartialType } from '@nestjs/mapped-types';
import { CreatePlumDto } from './create-plum.dto';

export class UpdatePlumDto extends PartialType(CreatePlumDto) {}
