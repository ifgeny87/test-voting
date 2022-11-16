import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'vote_answers' })
export class VoteAnswer extends Model<VoteAnswer>
{
	@AutoIncrement
	@PrimaryKey
	@Column({})
	declare id: number;

	@Column({ field: 'vote_id', type: DataType.INTEGER, allowNull: false })
	declare voteId: number;

	@Column({ field: 'cookie_user_id', type: DataType.STRING(100), allowNull: false })
	declare cookieUserId: string;

	@Column({ type: DataType.INTEGER, allowNull: false })
	declare answer: number;
}
