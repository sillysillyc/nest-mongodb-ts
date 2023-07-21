import { IsString, IsNotEmpty } from 'class-validator';
import {
  typeErrorMessage,
  emptyErrorMessage,
} from '../../../helpers/constants';

export class CreateUserDto {
  @IsString({ message: typeErrorMessage('name') })
  @IsNotEmpty({ message: emptyErrorMessage('name') })
  name: string;
}
