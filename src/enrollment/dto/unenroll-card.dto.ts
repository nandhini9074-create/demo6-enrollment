import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsOptional, IsArray, ArrayNotEmpty, ValidateNested } from "class-validator";

export class UnenrollCardItemDto {
  @ApiProperty({
    description: 'Mimojo Card ID',
    example: 'f271fab1-a80a-4662-a977-fb59d42b32c',
  })
  @IsString()
  @IsNotEmpty()
  mimojoCardId: string;


}


export class UnenrollCardDto {
  @ApiProperty({
    description: 'List of cards to unenroll',
    type: [UnenrollCardItemDto],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UnenrollCardItemDto)
  unenrollCards: UnenrollCardItemDto[];
}
