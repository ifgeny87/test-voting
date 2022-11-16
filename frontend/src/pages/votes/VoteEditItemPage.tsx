import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { clearVoteListAction, VotePayload } from '../../store/actions/VoteActions';
import { VoteShowResultCaptions } from '../../core/typeCast';
import { VoteShowResultType } from '../../core/types';
import { deleteVote, updateVote } from '../../api/votes.api';
import { useForm } from 'react-hook-form';
import { UpdateVoteDto } from '../../api/dto/UpdateVoteDto';

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

const Field = styled.div`
  padding: 0.5rem 0;
`;

const titleOptions = {
	required: true,
	minLength: 1,
	maxLength: 150,
	validate: (s: string) => !!s.trim().length,
}

const urlOptions = {
	required: true,
	minLength: 1,
	maxLength: 2500,
	validate: (s: string) => !!s.trim().length,
}

const resultTypeOptions = {
	required: true,
}

const resultTypeValues = [
	VoteShowResultType.HIDE,
	VoteShowResultType.SHOW_AFTER_ANSWER,
	VoteShowResultType.SHOW_WHEN_VOTE_STOP,
]

export default function VoteEditItemPage() {
	const [error, setError] = useState<string>();
	const { voteId } = useParams();
	const voteItem: VotePayload = useSelector(({ votes }: any) => {
		return votes?.find((v: VotePayload) => v.id === Number(voteId));
	});
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			...voteItem,
		},
	});
	const dispatch = useDispatch();
	const navigate = useNavigate();

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

	/**
	 * Отправка запроса на обновление голосования
	 * @param data
	 */
	async function onSubmit(data: any) {
		return await updateVote(voteItem.id, new UpdateVoteDto(
			data.title,
			data.showResultType,
			data.url,
		))
			.then(() => {
				// при удаче затираем текущий список голосований и переходим на страницу списка
				dispatch(clearVoteListAction());
				navigate('/');
			})
			.catch(error => {
				if (error.response?.status === 400) {
					setError(error.response.data?.error || 'Ошибка при заполнении');
				} else {
					setError(error.stack);
				}
				return false;
			});
	}

	function onDelete() {
		if (!window.confirm('Действительно удалить?')) return;
		deleteVote(voteItem.id)
			.then(() => {
				// при удаче затираем текущий список голосований и переходим на страницу списка
				dispatch(clearVoteListAction());
				navigate('/');
			})
	}

	return <>
		<div>
			<Link to="/">назад</Link>
		</div>
		<h1>Редактирование голосования #{voteItem.id}</h1>
		<form onSubmit={handleSubmit(onSubmit)}>
			<Fieldset disabled={isSubmitting}>
				<Field>
					Название голосования:
					<br />
					<input {...register('title', titleOptions)}/>
					{errors.title ? (
						<div className="error">
							{String(errors.title.message) || 'Заполните поле'}
						</div>
					) : null}
				</Field>
				<Field>
					Варианты ответов:
					<ul>
						{voteItem.answers.map(a => <li key={a}>{a}</li>)}
					</ul>
				</Field>
				<Field>
					URL страницы для голосования:
					<br />
					<input {...register('url', urlOptions)}/>
					{errors.url ? (
						<div className="error">
							{String(errors.url.message) || 'Заполните поле'}
						</div>
					) : null}
				</Field>
				<Field>
					Отображение результатов:
					{resultTypeValues.map(resType => (<>
						<div key={resType}>
							<label>
								<input {...register('showResultType', resultTypeOptions)}
								       type="radio" value={resType} />
								{VoteShowResultCaptions[resType]}
							</label>
						</div>
					</>))}
					{errors.showResultType ? (
						<div className="error">
							{String(errors.showResultType.message) || 'Заполните поле'}
						</div>
					) : null}
				</Field>
				{error ? <div className="error">Ошибка: {error}</div> : null}
				<button type="submit">Сохранить изменения</button>
			</Fieldset>
		</form>
		<p>
			<button onClick={onDelete} style={{ border: '2px solid red' }}>Удалить голосование
			</button>
		</p>
	</>;
}
