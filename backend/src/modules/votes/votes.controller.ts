import {
	BadRequestException,
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Put,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VotesService } from './votes.service';
import { Vote, VoteStatus } from './vote.model';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Response } from 'express';
import { UpdateVoteDto } from './dto/update-vote.dto';

@Controller('votes')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class VotesController
{
	constructor(private readonly votesService: VotesService) {}

	/**
	 * Список голосований
	 */
	@Get('list')
	async list(@Req() req: any): Promise<Vote[]> {
		return await this.votesService.findAll({
			where: {
				userId: req.user.id,
			},
		});
	}

	/**
	 * Получение одного голосования
	 */
	@Get(':id')
	async getOne(@Param('id') voteId: number, @Req() req: any): Promise<Vote> {
		return await this.votesService.findOne({
			where: {
				id: voteId,
				userId: req.user.id,
			},
		});
	}

	/**
	 * Создание нового голосования
	 */
	@Post('create')
	async createOne(@Body() newVoteDto: CreateVoteDto, @Req() req: any): Promise<void> {
		const vote = await this.votesService.findOneByUrl(newVoteDto.url);
		if (vote) {
			throw new BadRequestException('Голосование для этой страницы уже существует');
		}
		if (newVoteDto.answers.length < 2) {
			throw new BadRequestException('Вариантов ответа должно быть хотя бы 2');
		}
		await this.votesService.create({
			...newVoteDto,
			userId: req.user.id,
		});
	}

	/**
	 * Обновление голосования
	 */
	@Put(':voteId')
	async updateOne(
		@Param('voteId') voteId: number,
		@Body() voteDto: UpdateVoteDto,
	): Promise<void> {
		const existVote = await this.votesService.findOneById(voteId);
		if (!existVote) {
			throw new NotFoundException('Голосование не найдено');
		}
		const anotherVote = await this.votesService.findOneByUrl(voteDto.url);
		if (anotherVote && anotherVote?.id !== existVote.id) {
			throw new BadRequestException('Голосование для этой страницы уже существует');
		}
		await this.votesService.update(existVote, {
			...voteDto,
		});
	}

	@Delete(':voteId')
	async deleteOne(@Param('voteId') voteId: number, @Req() req: any): Promise<void> {
		const vote = await this.votesService.findOne({
			where: {
				userId: req.user.id,
				id: voteId,
			},
		});
		if (!vote) {
			throw new NotFoundException('Голосование не найдено');
		}
		await this.votesService.update(vote, {
			isArchived: true,
			url: `DELETED__${vote.url}`,
		});
	}

	/**
	 * Включение голосования
	 */
	@Post(':id/turn-on')
	async turnOn(
		@Param('id') voteId: number,
		@Req() req: any,
		@Res({ passthrough: true }) res: Response,
	): Promise<void> {
		const vote = await this.votesService.findOneById(voteId);
		if (!vote || vote.userId !== req.user.id) {
			throw new NotFoundException('Нет доступа к голосованию');
		}
		if (vote.status === VoteStatus.RUNNING) {
			throw new BadRequestException('Голосование уже запущено');
		}
		await this.votesService.update(vote, {
			status: VoteStatus.RUNNING,
		});
		res.status(HttpStatus.OK);
	}

	/**
	 * Выключение голосования
	 */
	@Post(':id/turn-off')
	async turnOff(
		@Param('id') voteId: number,
		@Req() req: any,
		@Res({ passthrough: true }) res: Response,
	): Promise<void> {
		const vote = await this.votesService.findOneById(voteId);
		if (!vote || vote.userId !== req.user.id) {
			throw new NotFoundException('Нет доступа к голосованию');
		}
		if (vote.status === VoteStatus.STOPPED) {
			throw new BadRequestException('Голосование уже остановлено');
		}
		await this.votesService.update(vote, {
			status: VoteStatus.STOPPED,
		});
		res.status(HttpStatus.OK);
	}
}
