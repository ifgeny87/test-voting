import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	NotFoundException,
	Post,
	Req,
	UseInterceptors,
} from '@nestjs/common';
import { VoteAnswersService } from './vote-answers.service';
import { VoteAnswerDto } from './dto/vote-answer.dto';
import { VotesService } from '../votes/votes.service';
import { UsersService } from '../users/users.service';
import { VoteStatus } from '../votes/vote.model';

@Controller('vote-answers')
@UseInterceptors(ClassSerializerInterceptor)
export class VoteAnswersController
{
	constructor(
		private readonly voteAnswersService: VoteAnswersService,
		private readonly votesService: VotesService,
		private readonly usersService: UsersService,
	) {}

	/**
	 * Добавление ответа
	 * !! PUBLIC
	 */
	@Post('vote')
	async createOne(@Body() voteAnswerDto: VoteAnswerDto): Promise<void> {
		// проверка пользователя, который создал голосование
		const voteUser = await this.usersService.findOneByExToken(voteAnswerDto.exToken);
		if (!voteUser) {
			throw new NotFoundException('Голосование не найдено');
		}
		// проверка голосования
		const vote = await this.votesService.findOne({
			where: {
				userId: voteUser.id,
				url: voteAnswerDto.url,
			},
		});
		if (!vote) {
			throw new NotFoundException('Голосование не найдено');
		}
		if (vote.status !== VoteStatus.RUNNING) {
			throw new BadRequestException('Голосование не запущено');
		}
		// поиск уже существующего ответа
		const existAnswer = await this.voteAnswersService.findOne({
			where: {
				voteId: vote.id,
				cookieUserId: voteAnswerDto.cookieUserId,
			},
		});
		if (existAnswer) {
			throw new BadRequestException('Голосование уже проведено');
		}
		// TODO check answer index
		// создание нового ответа
		await this.voteAnswersService.create({
			voteId: vote.id,
			cookieUserId: voteAnswerDto.cookieUserId,
			answer: voteAnswerDto.answer,
		});
	}
}
