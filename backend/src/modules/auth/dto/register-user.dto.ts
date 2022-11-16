import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto
{
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(50)
	readonly username: string;

	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(50)
	readonly password: string;
}
