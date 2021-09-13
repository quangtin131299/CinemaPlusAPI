import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Binhluan } from 'DTO/entities/Binhluan';
import { InsertResult, Repository } from 'typeorm';

@Injectable()
export class CommentService {

    constructor(@InjectRepository(Binhluan) private commentRepository: Repository<Binhluan>) {}

    async addNewComment(newComment: Binhluan):Promise<any>{
        try{
            await this.commentRepository.save(newComment)

            return {message: 'Success', statusCode:1}
        } catch(error){

            console.log(error);
            
            return {message: 'Fail', statusCode:0}
        }
    }

    getCommentOfMovie(idMovie: number): Promise<Binhluan[]> {
        return this.commentRepository.createQueryBuilder('comment')
                .innerJoinAndSelect('comment.idKhachHang2', 'customers')
                .innerJoinAndSelect('comment.idPhim2', 'movies')
                .where('comment.idPhim = :idmovie', {idmovie: idMovie})
                .select('comment.id','id')
                .addSelect('comment.noiDung', 'noiDung')
                .addSelect('DATE_FORMAT(comment.ngayDang, "%d/%m/%Y")', 'ngayDang')
                .addSelect('comment.idKhachHang', 'idKhachHang')
                .addSelect('customers.hoTen', 'hoTen')
                .addSelect('customers.anhDaiDien', 'anhDaiDien')
                .getRawMany();
    }
}
