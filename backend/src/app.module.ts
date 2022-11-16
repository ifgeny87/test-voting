import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/config/configuration';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VotesModule } from './modules/votes/votes.module';
import { VoteAnswersModule } from './modules/vote_answers/vote-answers.module';
import { VoteStatsModule } from './modules/vote_stats/vote-stats.module';

@Module({
	imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        DatabaseModule,
        AuthModule,
        UsersModule,
		VotesModule,
		VoteAnswersModule,
		VoteStatsModule,
	],
})
export class AppModule {}
