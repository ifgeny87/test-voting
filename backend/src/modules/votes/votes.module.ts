import { Module } from '@nestjs/common';
import { VotesController } from './votes.controller';
import { VotesService } from './votes.service';
import { votesProviders } from './votes.providers';

@Module({
	providers: [
		VotesService,
		...votesProviders,
	],
	exports: [VotesService],
	controllers: [VotesController],
})
export class VotesModule {}
