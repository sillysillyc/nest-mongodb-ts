import { IsString, IsNotEmpty } from 'class-validator';
import {
  typeErrorMessage,
  emptyErrorMessage,
} from '../../../helpers/constants';

export class PostDTO {
  @IsString({ message: typeErrorMessage('title') })
  @IsNotEmpty({ message: emptyErrorMessage('title') })
  readonly title: string;

  @IsString({ message: typeErrorMessage('description') })
  @IsNotEmpty({ message: emptyErrorMessage('description') })
  readonly description: string;

  @IsString({ message: typeErrorMessage('body') })
  @IsNotEmpty({ message: emptyErrorMessage('body') })
  readonly body: string;

  @IsString({ message: typeErrorMessage('author') })
  @IsNotEmpty({ message: emptyErrorMessage('author') })
  readonly author: string;
}
