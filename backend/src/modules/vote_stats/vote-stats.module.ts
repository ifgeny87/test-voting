import { Module } from '@nestjs/common';
import { VoteStatsService } from './vote-stats.service';
import { voteStatsProviders } from './vote-stats.providers';
import { VoteStatsController } from './vote-stats.controller';

@Module({
	providers: [
		VoteStatsService,
		...voteStatsProviders,
	],
	exports: [VoteStatsService],
	controllers: [VoteStatsController],
})
export class VoteStatsModule {}
