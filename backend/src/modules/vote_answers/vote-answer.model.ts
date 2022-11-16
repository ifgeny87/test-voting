import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Table({ tableName: 'vote_answers', updatedAt: false })
export class VoteAnswer extends Model<VoteAnswer>
{
	@Expose()
	@AutoIncrement
	@PrimaryKey
	@Column({})
	declare id: number;

	@Expose()
	@Column({ field: 'vote_id', type: DataType.INTEGER, allowNull: false })
	declare voteId: number;

	@Expose()
	@Column({ field: 'cookie_user_id', type: DataType.STRING(100), allowNull: false })
	declare cookieUserId: string;

	@Expose()
	@Column({ type: DataType.INTEGER, allowNull: false })
	declare answer: number;
}
