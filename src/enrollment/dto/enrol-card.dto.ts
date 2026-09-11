import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SupplementaryCardDto {
  @IsNotEmpty()
  @IsString()
  cardId: string;

  @IsNotEmpty()
  @IsString()
  schemeCardId: string;

  @IsOptional()
  cardLast4?: number | string;

  @IsBoolean()
  isNewCard: boolean;
}

export class CardDetailsDto {
  @IsNotEmpty()
  @IsString()
  cardId: string;

  @IsNotEmpty()
  @IsString()
  schemeCardId: string;

  @IsOptional()
  cardLast4?: number | string;

  @IsBoolean()
  isNewCard: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SupplementaryCardDto)
  supplementaryCards?: SupplementaryCardDto[];
}

export class EnrollCardDto {
  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  schemeUserId: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CardDetailsDto)
  cardDetails: CardDetailsDto[];
}
