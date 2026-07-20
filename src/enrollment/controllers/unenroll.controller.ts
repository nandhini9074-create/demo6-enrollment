import { Controller, HttpCode, HttpStatus, Body, Post } from '@nestjs/common';
import { BaseResponse } from 'src/common/dtos/base-response';
import { CardService } from '../services/unenroll.service';
import { UnenrollCardDto } from '../dto/unenroll-card.dto';
import { ApiEndpoint } from 'src/common/decorators/api-swagger';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @HttpCode(HttpStatus.OK)
  @Post('unenroll')
  @ApiEndpoint({
    summary: 'Unenroll a card',
    description: 'Unenrolls a specific card from the user',
    bodyType: UnenrollCardDto,
    successType: BaseResponse,
  })
  async unenroll(@Body() unenrollCardDto: UnenrollCardDto): Promise<BaseResponse<any>> {
    return await this.cardService.unenrollCard(unenrollCardDto);
  }
}