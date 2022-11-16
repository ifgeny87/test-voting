import {
	AutoIncrement,
	Column,
	DataType,
	DefaultScope,
	Model,
	PrimaryKey,
	Table,
} from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';

export enum VoteShowResultType
{
	HIDE = 'HIDE',
	SHOW_AFTER_ANSWER = 'SHOW_AFTER_ANSWER',
	SHOW_WHEN_VOTE_STOP = 'SHOW_WHEN_VOTE_STOP',
}

export enum VoteStatus
{
	STOPPED = 'STOPPED',
	RUNNING = 'RUNNING',
}

@Exclude()
@Table({ tableName: 'votes' })
@DefaultScope({
	where: {
		isArchived: false,
	},
})
export class Vote extends Model<Vote>
{
	@Expose()
	@AutoIncrement
	@PrimaryKey
	@Column({})
	declare id: number;

	@Expose()
	@Column({ field: 'user_id', type: DataType.INTEGER, allowNull: false })
	declare userId: number;

	@Expose()
	@Column({ type: DataType.STRING(150), allowNull: false })
	declare title: string;

	@Expose()
	@Column({ type: DataType.JSON, allowNull: false })
	declare answers: string[];

	@Expose()
	@Column({
		field: 'show_result_type',
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare showResultType: VoteShowResultType;

	@Expose()
	@Column({ type: DataType.STRING(2500), allowNull: false })
	declare url: string;

	@Expose()
	@Column({
		type: DataType.STRING(50),
		allowNull: false,
		defaultValue: VoteStatus.RUNNING,
	})
	declare status: VoteStatus;

	@Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
	declare isArchived: boolean;
}
