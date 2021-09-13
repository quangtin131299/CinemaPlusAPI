import { Controller, Get, Query } from '@nestjs/common';
import { Lichchieu } from 'DTO/entities/Lichchieu';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
export class ScheduleController {

    constructor(private scheduleService: ScheduleService) { }

    @Get('/getschedulebycinema')
    async getScheduleByCinema(@Query('idMovie') idMovie: number
                              , @Query('idCinema') idCinema: number
                              , @Query('currentDate') currentDate: string): Promise<any>{        
        let resultTime = await this.scheduleService.getScheduleByCinema(idCinema, currentDate ,idMovie);
                                 
        return this.convertTime(resultTime, false);
    }

    @Get('/getscheduleofdate')
    async getScheduleOfCurrentDate(@Query('idCinema') idCinema: number,@Query('currentDate') currentDate: string ): Promise<any>{   
        let resultSchedule = await this.scheduleService.getScheduleOfDate(idCinema, currentDate);

        return this.convertTime(resultSchedule, true);
    }

    convertTime(schedule: any, isGetScheduleOfDate: Boolean): any{
        let resultScheduleOfDate = {
            id: 0,
            ngay: '',
            phim: []
        };

        let resultScheduleOfCinema = {
            id: 0,
            ngay: '',
            phim: {
                id: 0,
                tenPhim: '',
            },
            suatchieus: []
        };


        if(schedule){
            if(isGetScheduleOfDate == true){

                resultScheduleOfDate.id = schedule.id;
                resultScheduleOfDate.ngay = schedule.ngay
                let countShowTime = schedule.phimLichchieus.length; 
                
                let nameMovie = '';

                for(let i = 0; i < countShowTime; i++){

                    let showTimes = [];

                    if(schedule.phimLichchieus[i].idPhim2.tenPhim != nameMovie){
                        for(let j = i; j < countShowTime; j++){
                            if(schedule.phimLichchieus[i].idPhim2.tenPhim === schedule.phimLichchieus[j].idPhim2.tenPhim){
                                showTimes.push({
                                    id: schedule.phimLichchieus[j].idSuatchieu2.id,
                                    gio: schedule.phimLichchieus[j].idSuatchieu2.gio
                                })
                            }
                        }

                        nameMovie = schedule.phimLichchieus[i].idPhim2.tenPhim;
                        
                        resultScheduleOfDate.phim.push({
                            id: schedule.phimLichchieus[i].idPhim,
                            tenPhim: schedule.phimLichchieus[i].idPhim2.tenPhim,
                            hinh: schedule.phimLichchieus[i].idPhim2.hinh,
                            thoiGian: schedule.phimLichchieus[i].idPhim2.thoiGian,
                            suatchieus: showTimes
                        })
                    }
                }
        
            }else{
                
                resultScheduleOfCinema.id = schedule.id;
                resultScheduleOfCinema.ngay = schedule.ngay;
                resultScheduleOfCinema.phim.id = schedule.phimLichchieus[0].idPhim2.id;
                resultScheduleOfCinema.phim.tenPhim = schedule.phimLichchieus[0].idPhim2.tenPhim;

                let lengthShowTime = schedule.phimLichchieus.length;
                
                for(let i = 0; i < lengthShowTime; i++){
                    resultScheduleOfCinema.suatchieus.push({
                        id: schedule.phimLichchieus[i].idSuatchieu2.id,
                        gio: schedule.phimLichchieus[i].idSuatchieu2.gio,
                    })
                }

            }     
        }

        return isGetScheduleOfDate == true ? resultScheduleOfDate : resultScheduleOfCinema;
    }
}
