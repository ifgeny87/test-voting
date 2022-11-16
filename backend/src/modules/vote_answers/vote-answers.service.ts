import { Inject, Injectable } from '@nestjs/common';
import { BaseModelService } from '../../core/services/BaseModelService';
import { RepositoryNames } from '../../core/const/repository.names';
import { VoteAnswer } from './vote-answer.model';

@Injectable()
export class VoteAnswersService extends BaseModelService<VoteAnswer>
{
	constructor(
		@Inject(RepositoryNames.VOTE_ANSWERS_REPOSITORY)
		private readonly voteAnswersRepository: typeof VoteAnswer,
	) {
		super(voteAnswersRepository);
	}
}
