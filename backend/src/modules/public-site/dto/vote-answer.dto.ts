import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class VoteAnswerDto
{
	@IsNotEmpty()
	@MaxLength(50)
	readonly exToken: string;

	@IsNotEmpty()
	@MaxLength(2500)
	readonly url: string;

	@IsNotEmpty()
	readonly answer: number;

	@IsNotEmpty()
	@MaxLength(100)
	readonly cookieUserId: string;
}
