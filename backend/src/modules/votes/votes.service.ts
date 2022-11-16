import { Inject, Injectable } from '@nestjs/common';
import { BaseModelService } from '../../core/services/BaseModelService';
import { RepositoryNames } from '../../core/const/repository.names';
import { Vote } from './vote.model';

@Injectable()
export class VotesService extends BaseModelService<Vote>
{
	constructor(
		@Inject(RepositoryNames.VOTES_REPOSITORY)
		private readonly votesRepository: typeof Vote,
	) {
		super(votesRepository);
	}
}
