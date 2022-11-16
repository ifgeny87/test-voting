import { Inject, Injectable } from '@nestjs/common';
import { BaseModelService } from '../../core/services/BaseModelService';
import { RepositoryNames } from '../../core/const/repository.names';
import { VoteStat } from './vote_stat.model';

@Injectable()
export class VoteStatsService extends BaseModelService<VoteStat>
{
	constructor(
		@Inject(RepositoryNames.VOTE_STATS_REPOSITORY)
		private readonly voteStatsRepository: typeof VoteStat,
	) {
		super(voteStatsRepository);
	}

	findOneByVoteId = async (voteId: number): Promise<VoteStat | null> => {
		return await this.voteStatsRepository.findOne({ where: { voteId } });
	};
}
