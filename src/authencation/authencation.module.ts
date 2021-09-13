import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Khachhang } from 'DTO/entities/Khachhang';
import { AuthencationController } from './authencation.controller';
import { AuthencationService } from './authencation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Khachhang]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  controllers: [AuthencationController],
  providers: [AuthencationService],
})
export class AuthencationModule {}
