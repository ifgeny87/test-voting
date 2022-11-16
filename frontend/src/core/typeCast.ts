import { VoteShowResultType, VoteStatus } from './types';

export const VoteShowResultCaptions = {
	[VoteShowResultType.HIDE]: 'Скрыты всегда',
	[VoteShowResultType.SHOW_AFTER_ANSWER]: 'Отображать после сохранения ответа',
	[VoteShowResultType.SHOW_WHEN_VOTE_STOP]: 'Отображать когда голосование остановлено',
}

export const VoteStatusCaptions = {
	[VoteStatus.RUNNING]: 'Запущено',
	[VoteStatus.STOPPED]: 'Остановлено',
}
