import { Module } from '@nestjs/common';
import { VoteAnswersService } from './vote-answers.service';
import { voteAnswersProviders } from './vote-answers.providers';
import { UsersModule } from '../users/users.module';
import { VotesModule } from '../votes/votes.module';

@Module({
	providers: [
		VoteAnswersService,
		...voteAnswersProviders,
	],
	exports: [VoteAnswersService],
	imports: [UsersModule, VotesModule],
})
export class VoteAnswersModule {}
