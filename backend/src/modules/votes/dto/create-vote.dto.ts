import { VoteShowResultType } from '../vote.model';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateVoteDto {
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(150)
	readonly title: string;

	@IsNotEmpty()
	readonly answers: string[];

	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(50)
	readonly showResultType: VoteShowResultType;

	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(2500)
	readonly url: string;
}
