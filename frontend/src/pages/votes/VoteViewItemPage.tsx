import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getVoteItemAction, VotePayload } from '../../store/actions/VoteActions';
import { VoteShowResultCaptions, VoteStatusCaptions } from '../../core/typeCast';
import { VoteStatus } from '../../core/types';
import { turnOffVote, turnOnVote } from '../../api/votes.api';

const Field = styled.div`
  padding: 0.5rem 0;
`;

export default function VoteViewItemPage() {
	const [error, setError] = useState<string>();
	const { voteId } = useParams();
	const voteItem: VotePayload = useSelector(({ votes }: any) => {
		return votes?.find((v: VotePayload) => v.id === Number(voteId));
	});
	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			// затираем ошибку спустя 3 сек
			setTimeout(() => setError(undefined), 3000);
		}
	}, [error]);

	if (!voteItem) {
		return <>
			<div>
				<Link to="/">назад</Link>
			</div>
			Голосование не найдено
		</>;
	}

	function onTurnOn() {
		turnOnVote(voteItem.id)
			.then(updateVote)
	}

	function onTurnOff() {
		turnOffVote(voteItem.id)
			.then(updateVote)
	}

	function updateVote() {
		// обновляем информацию о голосовании
		return getVoteItemAction(voteItem.id)
			.then(dispatch);
	}

	return <>
		<div>
			<Link to="/">назад</Link>
		</div>
		<h1>Просмотр голосования #{voteItem.id}</h1>
		<Field>
			Название голосования: <b>{voteItem.title}</b>
		</Field>
		<Field>
			Варианты ответов:
			<ul>
				{voteItem.answers.map(a => <li key={a}>{a}</li>)}
			</ul>
		</Field>
		<Field>
			URL страницы: <b>{voteItem.url}</b>
		</Field>
		<Field>
			Просмотр результатов: <b>{VoteShowResultCaptions[voteItem.showResultType]}</b>
		</Field>
		<Field>
			Статус: <b>{VoteStatusCaptions[voteItem.status]}</b>
		</Field>
		{error ? <div className="error">Ошибка: {error}</div> : null}
		{voteItem.status === VoteStatus.STOPPED ? (
			<button onClick={onTurnOn}>Запустить голосование</button>
		) : voteItem.status === VoteStatus.RUNNING ? (
			<button onClick={onTurnOff}>Остановить голосование</button>
		) : null}
	</>;
}
