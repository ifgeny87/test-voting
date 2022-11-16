import { createAction } from '@reduxjs/toolkit';
import { getVote, getVoteList } from '../../api/votes.api';
import { VoteShowResultType, VoteStatus } from '../../core/types';

export interface VotePayload
{
	id: number,
	title: string,
	answers: string[],
	url: string,
	showResultType: VoteShowResultType,
	status: VoteStatus,
}

export const FETCH_VOTE_LIST = createAction<VotePayload[]>('FETCH_VOTE_LIST');

export const getVoteListAction = async () => {
	return await getVoteList()
		.then(({ data }) => FETCH_VOTE_LIST(data));
}

export const FETCH_VOTE_ITEM = createAction<VotePayload>('FETCH_VOTE_ITEM');

export const getVoteItemAction = async (voteId: number) => {
	return await getVote(voteId)
		.then(({ data }) => FETCH_VOTE_ITEM(data));
}

export const CLEAR_VOTE_LIST = createAction('CLEAR_VOTE_LIST');

export const clearVoteListAction = () => {
	return CLEAR_VOTE_LIST();
}

