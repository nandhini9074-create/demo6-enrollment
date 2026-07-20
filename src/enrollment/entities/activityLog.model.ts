import {
    Column,
    Model,
    Table,
    DataType,
} from 'sequelize-typescript';

@Table({
    tableName: 'activity_logs',
    timestamps: true,
})
export class ActivityLog extends Model<ActivityLog> {

    @Column({
        type: DataType.UUID,
        allowNull: false,
    })
    traceId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    step: string;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
    })
    requestData: object;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
    })
    responseData: object;

    @Column({
        type: DataType.JSONB,
        allowNull: true,
    })
    error: object;
}
