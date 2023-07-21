// import { IsString, IsNotEmpty } from 'class-validator';
// import { typeMessage, emptyMessage } from './validateMessage';
import { PostDTO } from './post.dto';
export class CreatePostDTO extends PostDTO {
  readonly datePosted: string;
}
