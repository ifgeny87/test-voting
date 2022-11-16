import { VoteShowResultType } from '../../core/types';

export class UpdateVoteDto
{
	constructor(
		readonly title: string,
		readonly showResultType: VoteShowResultType,
		readonly url: string,
	) {}
}
