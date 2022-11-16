import { Injectable } from '@nestjs/common';
import { Vote, VoteShowResultType, VoteStatus } from '../votes/vote.model';
import {
	CannotSeeResultsDto,
	SiteVoteDto,
	SiteVoteResDto,
	SiteVoteResultsDto,
	WaitForStopVoteDto,
} from './dto/site-vote.res.dto';
import { VotesService } from '../votes/votes.service';
import { VoteAnswersService } from '../vote_answers/vote-answers.service';
import { VoteStatsService } from '../vote_stats/vote-stats.service';

@Injectable()
export class PublicSiteService
{
	constructor(
		private readonly votesService: VotesService,
		private readonly voteAnswersService: VoteAnswersService,
		private readonly voteStatsService: VoteStatsService,
	) {}

	async getVote(vote: Vote, cookieUserId: string): Promise<SiteVoteResDto> {
		// ответил ли пользователь
		const answer = await this.voteAnswersService.findOne({
			where: {
				voteId: vote.id,
				cookieUserId,
			},
		});
		if (vote.status === VoteStatus.RUNNING && !answer) {
			// голосование запущено, пользователь не отвечал
			return this.formatRunningVote(vote);
		} else {
			return await this.formatVoteResults(vote);
		}
	}

	private formatRunningVote(vote: Vote): SiteVoteDto {
		return new SiteVoteDto(vote.title, vote.answers);
	}

	private async formatVoteResults(vote: Vote): Promise<SiteVoteResultsDto | CannotSeeResultsDto | WaitForStopVoteDto> {
		if (vote.showResultType === VoteShowResultType.HIDE) {
			// результаты скрыты
			return new CannotSeeResultsDto();
		}
		if (vote.showResultType === VoteShowResultType.SHOW_WHEN_VOTE_STOP && vote.status === VoteStatus.RUNNING) {
			// чтобы увидеть результаты нужно дождаться остановки голосования
			return new WaitForStopVoteDto();
		}
		// в других случаях возвращаем результаты
		const voteStat = await this.voteStatsService.findOneByVoteId(vote.id);
		return new SiteVoteResultsDto(vote.title, vote.answers, voteStat.answerCounters);
	}
}
