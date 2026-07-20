import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import { UserCard } from './user-card.model';

@Table({
  tableName: 'customers',
  timestamps: true,
})
export class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV1,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare customerId: string;

  @HasMany(() => UserCard)
  enrollments: CreationOptional<UserCard[]>;
}
