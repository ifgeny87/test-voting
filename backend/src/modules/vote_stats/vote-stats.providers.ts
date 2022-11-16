import { RepositoryNames } from '../../core/const/repository.names';
import { VoteStatus } from '../votes/vote.model';

export const voteStatsProviders = [
	{
		provide: RepositoryNames.VOTE_STATS_REPOSITORY,
		useValue: VoteStatus,
	},
];
