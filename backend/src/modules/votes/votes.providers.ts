import { RepositoryNames } from '../../core/const/repository.names';
import { Vote } from './vote.model';

export const votesProviders = [
	{
		provide: RepositoryNames.VOTES_REPOSITORY,
		useValue: Vote,
	},
];
