import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePlumDto {
  @IsString()
  @IsNotEmpty()
  test: string;
}
