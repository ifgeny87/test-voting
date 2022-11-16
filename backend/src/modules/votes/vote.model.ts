import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

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

@Table({ tableName: 'votes' })
export class Vote extends Model<Vote>
{
	@AutoIncrement
	@PrimaryKey
	@Column({})
	declare id: number;

	@Column({ field: 'user_id', type: DataType.INTEGER, allowNull: false })
	declare userId: number;

	@Column({ type: DataType.STRING(150), allowNull: false })
	declare title: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	declare answers: string;

	@Column({
		field: 'show_result_type',
		type: DataType.STRING(50),
		allowNull: false,
	})
	declare showResultType: VoteShowResultType;

	@Column({ type: DataType.STRING(2500), allowNull: false })
	declare url: string;

	@Column({
		type: DataType.STRING(50),
		allowNull: false,
		defaultValue: VoteStatus.RUNNING,
	})
	declare status: VoteStatus;
}
