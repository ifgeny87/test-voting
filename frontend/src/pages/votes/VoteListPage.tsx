import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getVoteListAction, VotePayload } from '../../store/actions/VoteActions';
import { VoteShowResultCaptions, VoteStatusCaptions } from '../../core/typeCast';

const VoteItem = styled.div`
  border: 1px solid silver;
  margin: 1rem 0;
  padding: 0.5rem;
`;

const Title = styled.div`
  font-weight: bold;
`;

export default function VoteListPage() {
	const dispatch = useDispatch();
	const me = useSelector(({ me }: any) => me);
	const voteList = useSelector(({ votes }: any) => votes);

	useEffect(() => {
		const timerId = setTimeout(() => {
			if (!voteList) {
				getVoteListAction()
					.then(dispatch);
			}
		});
		return () => clearTimeout(timerId);
	}, []);

	return <>
		<p>
			Ваш токен: <code>{me.exToken}</code>
		</p>
		<h1>Список голосований</h1>
		<div>
			<Link to="/votes/create">Создать</Link>
		</div>
		<div>
			{voteList?.map((voteItem: VotePayload) => (
				<VoteItem key={voteItem.id}>
					<Title>
						#{voteItem.id}
						&nbsp;
						<Link to={`/votes/view/${voteItem.id}`}>
							{voteItem.title}
						</Link>
					</Title>
					<div>
						Просмотр результатов: {VoteShowResultCaptions[voteItem.showResultType]}
					</div>
					<div>
						Статус: {VoteStatusCaptions[voteItem.status]}
					</div>
				</VoteItem>
			))}
		</div>
	</>
}
