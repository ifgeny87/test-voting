export type SiteVoteResDto =
	| CannotSeeResultsDto
	| WaitForStopVoteDto
	| SiteVoteDto
	| SiteVoteResultsDto;

export type CannotSeeResultsDto = {
	reason: 'RESULTS_CANNOT_SEE',
}

export type WaitForStopVoteDto = {
	reason: 'WAIT_FOR_STOP_VOTE',
}

export type SiteVoteDto = {
	reason: 'SITE_VOTE_RUNNING',
	title: string,
	answers: string[],
}

export type SiteVoteResultsDto = {
	reason: 'SITE_VOTE_RESULTS',
	title: string,
	answers: string[],
	values: number[],
}
