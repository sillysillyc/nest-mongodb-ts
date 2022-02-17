import { IsString, IsNotEmpty } from 'class-validator';
import { typeMessage, emptyMessage } from './validateMessage';

export class PostDTO {
  @IsString({ message: typeMessage('title') })
  @IsNotEmpty({ message: emptyMessage('title') })
  readonly title: string;

  @IsString({ message: typeMessage('description') })
  @IsNotEmpty({ message: emptyMessage('description') })
  readonly description: string;

  @IsString({ message: typeMessage('body') })
  @IsNotEmpty({ message: emptyMessage('body') })
  readonly body: string;

  @IsString({ message: typeMessage('author') })
  @IsNotEmpty({ message: emptyMessage('author') })
  readonly author: string;
}
