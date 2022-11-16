import {
	ClassSerializerInterceptor,
	Controller,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VoteStatsService } from './vote-stats.service';

@Controller('vote-stats')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class VoteStatsController
{
	constructor(private readonly voteStatsService: VoteStatsService) {}

	// TODO
}
