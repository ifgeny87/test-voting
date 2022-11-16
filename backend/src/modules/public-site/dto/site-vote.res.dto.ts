import { AnswerCounters } from '../../vote_stats/vote_stat.model';

export type SiteVoteResDto =
	| CannotSeeResultsDto
	| WaitForStopVoteDto
	| SiteVoteDto
	| SiteVoteResultsDto;

export class CannotSeeResultsDto
{
	readonly reason = 'RESULTS_CANNOT_SEE';
}

export class WaitForStopVoteDto
{
	readonly reason = 'WAIT_FOR_STOP_VOTE';
}

export class SiteVoteDto
{
	readonly reason = 'SITE_VOTE_RUNNING';

	constructor(
		readonly title: string,
		readonly answers: string[],
	) {}
}

export class SiteVoteResultsDto
{
	readonly reason = 'SITE_VOTE_RESULTS';

	constructor(
		public readonly title: string,
		public readonly answers: string[],
		public readonly values: AnswerCounters,
	) {}
}
