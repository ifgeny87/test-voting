import { Module } from '@nestjs/common';
import { VotesModule } from '../votes/votes.module';
import { VoteAnswersModule } from '../vote_answers/vote-answers.module';
import { PublicSiteService } from './public-site.service';
import { PublicSiteController } from './public-site.controller';
import { UsersModule } from '../users/users.module';
import { VoteStatsModule } from '../vote_stats/vote-stats.module';

@Module({
	providers: [PublicSiteService],
	imports: [UsersModule, VotesModule, VoteAnswersModule, VoteStatsModule],
	controllers: [PublicSiteController],
})
export class PublicSiteModule {}
