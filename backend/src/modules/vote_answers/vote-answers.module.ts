import { Module } from '@nestjs/common';
import { VoteAnswersService } from './vote-answers.service';
import { voteAnswersProviders } from './vote-answers.providers';
import { VoteAnswersController } from './vote-answers.controller';

@Module({
	providers: [
		VoteAnswersService,
		...voteAnswersProviders,
	],
	exports: [VoteAnswersService],
	controllers: [VoteAnswersController],
})
export class VoteAnswersModule {}
