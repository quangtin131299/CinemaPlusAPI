import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Binhluan } from 'Models/entities/Binhluan';
import { CommentService } from './comment.service';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {

    private readonly ARRAY_KEY_WORD_SPAM: string[] = [
        "lz",
        "lồn",
        "vc",
        "vãi cặc",
        "đjên",
        "điên",
        "wtf ",
        "What the fuck",
        "cmm",
        "con mẹ mày",
        "cmnr",
        "con mẹ nó rồi",      
        "vcl",
        "vãi cái lồn",
        "vãi cả lồn",
        "lol",
        "loz",
        "lozz",
        "sml",
        "sắp mặt lồn",
        "cmn",
        "con mẹ nó",
        "qq",
        "quần què",
        "clmm",
        "cái lồn mẹ mày",
        "vcđ",
        "vãi cả đái",   
        "zú",
        "vú",
        "bú",
        "dm",
        "đụ má",
        "địch mẹ",
        "xàm lồn",
        "xạo lồn",
        "cc",
        "con cặc"]

    constructor(private commentService: CommentService) {        
    }

   
    @Post("/addnewcomment")
    @ApiCreatedResponse({description: 'Create new comment for movie'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    async addNewComment(@Body() dataComment: any): Promise<Object>{
        let newComment = new Binhluan();

        let countKeyWordSpam = this.ARRAY_KEY_WORD_SPAM.length;

        for(let i = 0; i < countKeyWordSpam; i++){
            let result = dataComment.noiDung.includes(this.ARRAY_KEY_WORD_SPAM[i].trim());

            if(result == true){                
                return {message: 'Fail', statusCode:0};
            }
        }

        newComment.noiDung = dataComment.noiDung;
        newComment.ngayDang = dataComment.ngayDang;
        newComment.idPhim = dataComment.idPhim;
        newComment.idKhachHang = dataComment.idKhachHang;
        let resultAddComment = await this.commentService.addNewComment(newComment); 

        return resultAddComment;
    }

    @Get("/getcommentbymovie")
    @ApiOkResponse({description: 'Get comment of movie'})
    @ApiNotFoundResponse({description: 'Not Found.'})
    getCommentOfMovie(@Query('idMovie') idMovie: number){
        return this.commentService.getCommentOfMovie(idMovie);
    }


}
