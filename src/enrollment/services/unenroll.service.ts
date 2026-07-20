import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';
import { CardStatus } from 'src/enums/card-status.enum';
import { UnenrollCardDto } from '../dto/unenroll-card.dto';
import { UserCard } from '../entities/user-card.model';

@Injectable()
export class CardService {
  private readonly logger = new Logger(CardService.name);

  constructor(
    @InjectModel(UserCard)
    private readonly userCardModel: typeof UserCard,
  ) {}

  async unenrollCard(payload: UnenrollCardDto): Promise<any> {
    const traceId = uuidv4();
    const results: Array<Record<string, unknown>> = [];

    for (const item of payload.unenrollCards) {
      const existing = await this.userCardModel.findByPk(item.mimojoCardId);

      if (!existing) {
        results.push({
          mimojoCardId: item.mimojoCardId,
          status: 'NotFound',
          message: 'Card not found',
        });
        continue;
      }

      const nextStatus = item.replaceSchemeCardId ? CardStatus.ACTIVE : CardStatus.PAUSED;
      await existing.update({
        isActive: Boolean(item.replaceSchemeCardId),
        schemeCardId: item.replaceSchemeCardId ?? existing.schemeCardId,
        status: nextStatus,
      });

      results.push({
        mimojoCardId: item.mimojoCardId,
        status: 'Success',
      });
    }

    const response = {
      traceId,
      statusCode: HttpStatus.OK.toString(),
      message: 'Card unenrollment processed successfully',
      data: {
        cardResults: results,
      },
    };

    this.logger.log(`unenrollCard completed: ${traceId}`);
    return response;
  }
}
