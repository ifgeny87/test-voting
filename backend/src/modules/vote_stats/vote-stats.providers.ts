import { RepositoryNames } from '../../core/const/repository.names';
import { VoteStat } from './vote_stat.model';

export const voteStatsProviders = [
	{
		provide: RepositoryNames.VOTE_STATS_REPOSITORY,
		useValue: VoteStat,
	},
];
