import { RepositoryNames } from '../../core/const/repository.names';
import { VoteAnswer } from './vote-answer.model';

export const voteAnswersProviders = [
	{
		provide: RepositoryNames.VOTE_ANSWERS_REPOSITORY,
		useValue: VoteAnswer,
	},
];
