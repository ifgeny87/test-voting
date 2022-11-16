import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	Req,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController
{
	constructor(private readonly usersService: UsersService) {}

	/**
	 * Возвращает информацию о текущем пользователе
	 */
	@Get('me')
	async getMe(@Req() req: any): Promise<User> {
		return await this.usersService.findOneById(req.user.id);
	}
}
