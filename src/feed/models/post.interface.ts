import { User } from 'src/auth/models/user.class';

export interface FeedPost {
  id?: string;
  body?: string;
  createdAt?: Date;
  author?: User;
}
