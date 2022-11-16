import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'vote_stats' })
export class VoteStat extends Model<VoteStat>
{
	@AutoIncrement
	@PrimaryKey
	@Column({})
	declare id: number;

	@Column({field:'vote_id', type: DataType.INTEGER, allowNull: false })
	declare voteId: number;

	@Column({ field:'answer_counters',type: DataType.JSON, allowNull: false })
	declare answerCounters: string;
}
