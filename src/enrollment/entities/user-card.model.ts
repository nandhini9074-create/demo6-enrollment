import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { CardStatus } from 'src/enums/card-status.enum';
import { Customer } from './customer.model';

@Table({
  paranoid: true,
  indexes: [
    {
      fields: ['user_id', 'scheme_card_id'],
    },
  ],
})
export class UserCard extends Model<InferAttributes<UserCard>, InferCreationAttributes<UserCard>> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  declare id: CreationOptional<string>;

  @ForeignKey(() => Customer)
  @Column({
    field: 'user_id',
    type: DataType.UUID,
    allowNull: false,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  declare cardId: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare schemeCardId: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  declare cardScheme: string;

  @Column({
    type: DataType.STRING(12),
    allowNull: true,
  })
  declare cardBin: string;

  @Column({
    type: DataType.STRING(4),
    allowNull: false,
  })
  declare cardLast4: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare schemeUserId: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
    unique: true,
  })
  declare fingerPrint: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  declare issuerBank: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  declare isActive: boolean;

  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  declare profileId: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare parentCardId?: string | null;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare isSupplementary: boolean;

  @Column({
    type: DataType.ENUM(...Object.values(CardStatus)),
    allowNull: false,
    defaultValue: CardStatus.ACTIVE,
  })
  status: CardStatus;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  declare activity?: string | null;
}
