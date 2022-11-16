import { createAction } from '@reduxjs/toolkit';
import { getMyInfo } from '../../api/sign.api';

export interface MePayload
{
	exToken: string,
	username: string,
}

export const FETCH_ME_CONFIG = createAction<MePayload>('FETCH_ME_CONFIG');

export const fetchMeAction = async () => {
	return await getMyInfo()
		.then(({ data }) => FETCH_ME_CONFIG(data));
}

export const CLEAR_ME_CONFIG = createAction('CLEAR_ME_CONFIG');

export const clearMeAction = () => {
	return CLEAR_ME_CONFIG();
}
