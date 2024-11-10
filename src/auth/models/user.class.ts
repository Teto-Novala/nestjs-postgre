import { FeedPost } from 'src/feed/models/post.interface';
import { Role } from './role.enum';
import { IsEmail, IsString } from 'class-validator';

export class User {
  id?: string;
  firstname?: string;
  lastname?: string;
  @IsEmail()
  email?: string;
  @IsString()
  password?: string;
  imagePath?: string;
  role?: Role;
  posts?: FeedPost[];
}
