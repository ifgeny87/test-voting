import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller, NotFoundException,
	Post,
	UseInterceptors,
} from '@nestjs/common';
import { PublicSiteService } from './public-site.service';
import { SiteVoteReqDto } from './dto/site-vote.req.dto';
import { SiteVoteResDto } from './dto/site-vote.res.dto';
import { UsersService } from '../users/users.service';
import { VotesService } from '../votes/votes.service';
import { VoteAnswersService } from '../vote_answers/vote-answers.service';
import { VoteAnswerDto } from './dto/vote-answer.dto';
import { VoteStatus } from '../votes/vote.model';

@Controller('site')
@UseInterceptors(ClassSerializerInterceptor)
export class PublicSiteController
{
	constructor(
		private readonly usersService: UsersService,
		private readonly votesService: VotesService,
		private readonly voteAnswersService: VoteAnswersService,
		private readonly publicSiteService: PublicSiteService,
	) {}

	/**
	 * Запрос статуса голосования
	 */
	@Post('vote/one')
	async list(@Body() voteDto: SiteVoteReqDto): Promise<SiteVoteResDto> {
		// проверка пользователя, который создал голосование
		const voteUser = await this.usersService.findOneByExToken(voteDto.exToken);
		if (!voteUser) {
			throw new NotFoundException('Голосование не найдено');
		}
		// проверка голосования
		const vote = await this.votesService.findOne({
			where: {
				userId: voteUser.id,
				url: voteDto.url,
			},
		});
		if (!vote) {
			throw new NotFoundException('Голосование не найдено');
		}
		return await this.publicSiteService.getVote(vote, voteDto.cookieUserId);
	}

	/**
	 * Добавление ответа
	 */
	@Post('vote/answer')
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
		if(voteAnswerDto.answer < 0 || voteAnswerDto.answer > vote.answers.length - 1) {
			throw new BadRequestException('Вариант ответа недопустим');
		}
		// создание нового ответа
		await this.voteAnswersService.create({
			voteId: vote.id,
			cookieUserId: voteAnswerDto.cookieUserId,
			answer: voteAnswerDto.answer,
		});
		await this.votesService.updateStats(vote);
	}
}
