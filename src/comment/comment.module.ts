import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Binhluan } from 'Models/entities/Binhluan';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Binhluan])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
