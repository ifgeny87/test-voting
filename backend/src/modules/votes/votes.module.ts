import { Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { votesProviders } from './votes.providers';
import { VoteStatsModule } from '../vote_stats/vote-stats.module';

@Module({
	providers: [
		VotesService,
		...votesProviders,
	],
	exports: [VotesService],
	imports: [VoteStatsModule],
	controllers: [VotesController],
})
export class VotesModule {}
