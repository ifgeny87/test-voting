import { fetchBackend } from '../core/api/fetchBackendRoot';
import { CreateVoteDto } from './dto/CreateVoteDto';

export async function getVoteList(): Promise<any> {
	return await fetchBackend
		.get('votes/list');
}

export async function getVote(voteId: number): Promise<any> {
	return await fetchBackend
		.get(`votes/${voteId}`);
}

export async function createVote(creteVoteDto: CreateVoteDto): Promise<any> {
	return await fetchBackend
		.post('votes/create', creteVoteDto);
}

export async function turnOnVote(voteId: number): Promise<void> {
	return await fetchBackend
		.post(`votes/${voteId}/turn-on`);
}

export async function turnOffVote(voteId: number): Promise<void> {
	return await fetchBackend
		.post(`votes/${voteId}/turn-off`);
}
