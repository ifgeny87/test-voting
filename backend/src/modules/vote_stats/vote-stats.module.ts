import { Module } from '@nestjs/common';
import { VoteStatsService } from './vote-stats.service';
import { voteStatsProviders } from './vote-stats.providers';

@Module({
	providers: [
		VoteStatsService,
		...voteStatsProviders,
	],
	exports: [VoteStatsService],
})
export class VoteStatsModule {}
