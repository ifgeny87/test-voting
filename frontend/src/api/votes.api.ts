import { fetchBackend } from '../core/api/fetchBackendRoot';
import { CreateVoteDto } from './dto/CreateVoteDto';
import { UpdateVoteDto } from './dto/UpdateVoteDto';

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

export async function updateVote(voteId: number, updateVoteDto: UpdateVoteDto): Promise<any> {
	return await fetchBackend
		.put(`votes/${voteId}`, updateVoteDto);
}

export async function turnOnVote(voteId: number): Promise<void> {
	return await fetchBackend
		.post(`votes/${voteId}/turn-on`);
}

export async function turnOffVote(voteId: number): Promise<void> {
	return await fetchBackend
		.post(`votes/${voteId}/turn-off`);
}

export async function deleteVote(voteId: number): Promise<void> {
	return await fetchBackend
		.delete(`votes/${voteId}`);
}
