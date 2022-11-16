import { createReducer } from '@reduxjs/toolkit';
import {
	FETCH_VOTE_LIST,
	FETCH_VOTE_ITEM,
	CLEAR_VOTE_LIST,
	VotePayload,
} from '../actions/VoteActions';

export const votesReducer = createReducer<VotePayload[] | null>(null,
	builder => builder
		// обновление списка
		.addCase(FETCH_VOTE_LIST, (state, { payload }) => {
			return payload;
		})
		// обновление одного голосования
		.addCase(FETCH_VOTE_ITEM, (state, {payload}) => {
			let found = false;
			state?.forEach(v => {
				if (v.id === payload.id) {
					Object.assign(v, payload);
					found = true;
				}
			});
			if (!state) {
				return [payload];
			}
			if (!found) {
				state.push(payload);
			}
		})
		// очистка списка
		.addCase(CLEAR_VOTE_LIST, () => null),
);
