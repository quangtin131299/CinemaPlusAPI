import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { Response } from 'express';

@ApiTags('Country')
@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get('getcountrymovie')
  @ApiOkResponse({ description: 'Get all country' })
  @ApiNotFoundResponse({ description: 'Not Found.' })
  async getContryOfMovie(@Res() res: Response): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .json(await this.countryService.getCountryMovie());
  }
}
