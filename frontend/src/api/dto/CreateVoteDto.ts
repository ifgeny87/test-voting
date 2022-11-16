import { VoteShowResultType } from '../../core/types';

export class CreateVoteDto
{
	constructor(
		readonly title: string,
		readonly answers: string[],
		readonly showResultType: VoteShowResultType,
		readonly url: string,
	) {}
}
