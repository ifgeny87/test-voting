import { fetchBackend } from './fetchBackendRoot';

export async function fetchVote(url: string, exToken: string, cookieUserId: string): Promise<any> {
	return await fetchBackend
		.post('site/vote/one', {
			url,
			exToken,
			cookieUserId,
		});
}

export async function sendVote(url: string, exToken: string, cookieUserId: string, answer: number): Promise<any> {
	return await fetchBackend
		.post('site/vote/answer', {
			url,
			exToken,
			cookieUserId,
			answer,
		});
}
