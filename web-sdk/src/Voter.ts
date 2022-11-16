import { getCookieUserId, saveCookieUserId } from './utils/cookie';
import { fetchVote, sendVote } from './api/votes.api';
import { SiteVoteDto, SiteVoteResDto, SiteVoteResultsDto } from './types/site-vote.res.dto';
import { createNode } from './utils/dom';

export class Voter
{
	private readonly cookieUserId: string;
	private exToken: string;
	private node: HTMLElement;
	private voteRes: SiteVoteResDto;
	private error: string;
	private warning: string;
	private isSubmiting: boolean = false;
	private selectedValue: number | null = null;

	constructor() {
		// проверяем токен в куках
		const cookieUserId = getCookieUserId();
		if (!cookieUserId) {
			// если не создан, генерим уникальный
			this.cookieUserId = Math.random().toString(36);
		} else {
			this.cookieUserId = cookieUserId;
		}
	}

	/**
	 * Загружаем голосование и отрисовываем блок
	 */
	setupVote = (exToken: string, node: HTMLElement) => {
		this.node = node;
		this.updateSiteNode();
		this.exToken = exToken;
		this.updateVoteInfo();
	}

	private updateVoteInfo = () => {
		fetchVote(document.location.href, this.exToken, this.cookieUserId)
			.then(({ data }) => {
				this.voteRes = data;
			})
			.catch(error => {
				if (error.response?.status === 404) {
					this.error = 'Голосование не найдено';
				} else {
					this.error = 'Необработанная ошибка';
				}
			})
			.finally(this.updateSiteNode)
	}

	private updateSiteNode = () => {
		if (!this.voteRes && !this.error) {
			return this.node.innerHTML = '<center>Загрузка</center>';
		}
		if (this.error) {
			return this.node.innerHTML = `<div class="_error">${this.error}</ccenter>`;
		}
		if (this.voteRes.reason === 'WAIT_FOR_STOP_VOTE') {
			return this.node.innerHTML = `<div class="_info">Ожидайте окончания голосования</ccenter>`;
		}
		if (this.voteRes.reason === 'RESULTS_CANNOT_SEE') {
			return this.node.innerHTML = `<div class="_info">Результаты голосования недоступны для просмотра</ccenter>`;
		}
		if (this.voteRes.reason === 'SITE_VOTE_RUNNING') {
			this.drawVote(this.voteRes);
		}
		if (this.voteRes.reason === 'SITE_VOTE_RESULTS') {
			this.drawResults(this.voteRes);
		}
	}

	private drawVote = (vote: SiteVoteDto) => {
		this.node.innerHTML = '';
		createNode('div', '_title', this.node)
			.innerText = vote.title;
		const fieldset = createNode('fieldset', '_fields', this.node);
		fieldset.toggleAttribute('disabled', this.isSubmiting);
		const ul = createNode('ul', '_list', fieldset);
		vote.answers.forEach((ans, index) => {
			const li = createNode('li', '_answer', ul);
			const label = createNode('label', null, li);
			const input = createNode('input', null, label);
			input.setAttribute('type', 'radio');
			input.setAttribute('name', 'voting');
			input.setAttribute('value', index.toString());
			input.addEventListener('change', this.onChangeValue);
			label.appendChild(new Text(ans));
		});
		if (this.warning) {
			createNode('div', '_warning', fieldset)
				.innerText = this.warning;
		}
		const btnArea = createNode('div', '_buttons', fieldset);
		const voteBtn = createNode('button', null, btnArea);
		voteBtn.innerText = 'Голосовать';
		voteBtn.addEventListener('click', this.onVoteClick);
	}

	private drawResults = (vote: SiteVoteResultsDto) => {
		this.node.innerHTML = '';
		createNode('div', '_title', this.node)
			.innerText = vote.title;
		const ul = createNode('ul', '_list', this.node);
		vote.answers.forEach((ans, index) => {
			const li = createNode('li', '_answer', ul);
			createNode('span', '_text', li)
				.innerText = ans;
			createNode('span', '_value', li)
				.innerText = vote.values[index].toString();
		});
	}

	private onChangeValue = (event: any) => {
		this.selectedValue = Number(event.target.value);
		if(this.warning) {
			this.warning = null;
			this.updateSiteNode();
		}
	}

	private onVoteClick = () => {
		// проверка
		if (this.selectedValue === null) {
			this.warning = 'Выберите вариант ответа';
			return this.updateSiteNode();
		}
		// запоминаем userId в куках
		saveCookieUserId(this.cookieUserId);
		this.isSubmiting = true;
		this.updateSiteNode();
		// отправляем ответ
		sendVote(document.location.href, this.exToken, this.cookieUserId, this.selectedValue)
			.then(() => {
				// обновляем статус голосования
				this.updateVoteInfo();
			})
			.catch(error => {
				if (error.response?.status === 404) {
					this.error = 'Голосование не найдено';
				} else {
					this.error = error.response.data?.error || 'Необработанная ошибка';
				}
			})
			.finally(() => {
				debugger;
				this.isSubmiting = false;
				this.updateSiteNode();
			})
	}
}
