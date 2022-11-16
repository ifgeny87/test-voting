import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { VoteShowResultType } from '../../core/types';
import { createVote } from '../../api/votes.api';
import { CreateVoteDto } from '../../api/dto/CreateVoteDto';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { clearVoteListAction } from '../../store/actions/VoteActions';
import { VoteShowResultCaptions } from '../../core/typeCast';

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
}

const answersOptions = {
	required: true,
}

const urlOptions = {
	required: true,
	minLength: 1,
	maxLength: 2500,
}

const resultTypeOptions = {
	required: true,
}

const resultTypeValues = [
	VoteShowResultType.HIDE,
	VoteShowResultType.SHOW_AFTER_ANSWER,
	VoteShowResultType.SHOW_WHEN_VOTE_STOP,
]

export default function VoteCreateItemPage() {
	const [error, setError] = useState<string>();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (error) {
			// затираем ошибку спустя 3 сек
			setTimeout(() => setError(undefined), 3000);
		}
	}, [error]);

	/**
	 * Отправка запроса на создание голосования
	 * @param data
	 */
	async function onSubmit(data: any) {
		const answers = data.answers.split('\n');
		return await createVote(new CreateVoteDto(
			data.title,
			answers,
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

	return <>
		<div>
			<Link to="/">назад</Link>
		</div>
		<h1>Создание голосования</h1>
		<form onSubmit={handleSubmit(onSubmit)}>
			<Fieldset disabled={isSubmitting}>
				<Field>
					Название голосования:
					<br />
					<input {...register('title', titleOptions)}
					       defaultValue="Тестовое голосование" />
					{errors.title ? (
						<div className="error">
							{String(errors.title.message) || 'Заполните поле'}
						</div>
					) : null}
				</Field>
				<Field>
					Варианты ответов:
					<br />
					<textarea {...register('answers', answersOptions)}
					          defaultValue={'вариант 1\nвариант 2\nвариант 3'} />
					{errors.answers ? (
						<div className="error">
							{String(errors.answers.message) || 'Заполните поле'}
						</div>
					) : null}
				</Field>
				<Field>
					URL страницы для голосования:
					<br />
					<input {...register('url', urlOptions)}
					       defaultValue="http://site" />
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
								       type="radio" value={resType}
								       defaultChecked />
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
				<button type="submit">Создать голосование</button>
			</Fieldset>
		</form>
	</>;
}
