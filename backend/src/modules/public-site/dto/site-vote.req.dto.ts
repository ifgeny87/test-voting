import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class SiteVoteReqDto
{
	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(2500)
	readonly url: string;

	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(50)
	readonly exToken: string;

	@IsNotEmpty()
	@MinLength(1)
	@MaxLength(100)
	readonly cookieUserId: string;
}
