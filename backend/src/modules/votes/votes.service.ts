import { Inject, Injectable } from '@nestjs/common';
import { BaseModelService } from '../../core/services/BaseModelService';
import { RepositoryNames } from '../../core/const/repository.names';
import { Vote } from './vote.model';
import { QueryTypes } from 'sequelize';
import { VoteStatsService } from '../vote_stats/vote-stats.service';
import { AnswerCounters } from '../vote_stats/vote_stat.model';

@Injectable()
export class VotesService extends BaseModelService<Vote>
{
	constructor(
		@Inject(RepositoryNames.VOTES_REPOSITORY)
		private readonly votesRepository: typeof Vote,
		private readonly voteStatsService: VoteStatsService,
	) {
		super(votesRepository);
	}

	findOneByUrl = async (url: string): Promise<Vote | null> => {
		return await this.votesRepository.findOne({ where: { url } });
	};

	/**
	 * Обновление статистики голосования
	 * @param vote
	 */
	updateStats = async (vote: Vote): Promise<void> => {
		// формируем статистику
		const answerCounts = await this.votesRepository.sequelize.query(
			`SELECT answer, COUNT(answer) as "kount"
             FROM vote_answers
             WHERE vote_id = $voteId
             GROUP BY answer`,
			{
				bind: {
					voteId: vote.id,
				},
				type: QueryTypes.SELECT,
			},
		);
		const answerCountMap = answerCounts.reduce((map, i: any) => {
			map[i.answer] = Number(i.kount);
			return map;
		}, {});
		const answerCounters: AnswerCounters = vote.answers.map((_, index) => {
			return answerCountMap[index] || 0;
		});
		// обновляем или создаем статистику по голосованию
		const voteStat = await this.voteStatsService.findOneByVoteId(vote.id);
		if (voteStat) {
			await this.voteStatsService.update(voteStat, {
				answerCounters,
			});
		} else {
			await this.voteStatsService.create({
				voteId: vote.id,
				answerCounters,
			});
		}
	}
}
