import { Controller, HttpCode, HttpStatus, Body, Post } from "@nestjs/common";
import { BaseResponse } from "src/common/dtos/base-response";
import { CardService } from "../services/enroll.service";
import { ApiEndpoint } from "src/common/decorators/api-swagger";
import { EnrollCardDto } from "../dto/enrol-card.dto";

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @HttpCode(HttpStatus.OK)
  @Post('enroll')
  @ApiEndpoint({
    summary: 'Enroll a card',
    description: 'Enrolls a specific card from the user',
    bodyType: EnrollCardDto,
    successType: BaseResponse,
  })
  async enroll(@Body() unenrollCardDto: EnrollCardDto): Promise<BaseResponse<any>> {
    return await this.cardService.enrollCard(unenrollCardDto);
  }
}