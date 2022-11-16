import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VotesService } from './votes.service';
import { Vote } from './vote.model';

@Controller('votes')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class VotesController
{
	constructor(private readonly votesService: VotesService) {}

	@Get('list')
	async list(): Promise<Vote[]> {
		return await this.votesService.findAll();
	}
}
