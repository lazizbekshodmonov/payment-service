import { UserType } from '../user.enum';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 150)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 150)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 150)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsEnum(UserType, {
    message: `Type must be one of: ${Object.values(UserType).join(', ')}`,
  })
  type: UserType;

  @IsOptional()
  @IsBoolean()
  isActive: boolean = false;
}
