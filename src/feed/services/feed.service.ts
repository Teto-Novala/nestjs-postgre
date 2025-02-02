import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPost } from '../models/post.interface';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/models/user.class';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(user: User, feedPost: FeedPost): Observable<FeedPost> {
    feedPost.author = user;
    return from(this.feedPostRepository.save(feedPost));
  }

  findAllPost(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  findPosts(take: number = 10, skip: number = 0): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.findAndCount({ take, skip }).then(([posts]) => {
        return posts;
      }),
    );
  }

  updatePost(id: string, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  deletePost(id: string): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }

  findPostById(id: string): Observable<FeedPost> {
    return from(
      this.feedPostRepository.findOne({
        where: { id },
        relations: ['author'],
      }),
    );
  }
}
