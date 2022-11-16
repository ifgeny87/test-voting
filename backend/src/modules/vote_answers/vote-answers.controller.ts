import {
	ClassSerializerInterceptor,
	Controller,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VoteAnswersService } from './vote-answers.service';

@Controller('vote-answers')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(ClassSerializerInterceptor)
export class VoteAnswersController
{
	constructor(private readonly voteAnswersService: VoteAnswersService) {}

	// TODO
}
