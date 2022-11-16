import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Table({ tableName: 'users' })
export class User extends Model<User>
{
	@Expose()
	@AutoIncrement
	@PrimaryKey
	@Column({})
	declare id: number;

	@Expose()
	@Column({ field: 'ex_token', type: DataType.STRING(50), allowNull: false })
	declare exToken: string;

	@Expose()
	@Column({ type: DataType.STRING(50), allowNull: false })
	declare username: string;

	@Column({ field: 'password_hash', type: DataType.STRING(150), allowNull: false })
	declare passwordHash?: string;
}
