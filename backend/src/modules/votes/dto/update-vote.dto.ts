import { VoteShowResultType } from '../vote.model';
import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateVoteDto
{
	@Transform(({ value }) => value.trim())
	@IsNotEmpty()
	@MaxLength(150)
	readonly title: string;

	@IsNotEmpty()
	@IsString()
	@IsIn(Object.keys(VoteShowResultType))
	readonly showResultType: VoteShowResultType;

	@Transform(({ value }) => value.trim())
	@IsNotEmpty()
	@MaxLength(2500)
	readonly url: string;
}
