import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SiteVoteReqDto
{
	@IsNotEmpty()
	@MaxLength(2500)
	readonly url: string;

	@IsNotEmpty()
	@MaxLength(50)
	readonly exToken: string;

	@IsNotEmpty()
	@MaxLength(100)
	readonly cookieUserId: string;
}
