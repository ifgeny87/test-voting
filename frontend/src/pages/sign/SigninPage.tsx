import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchMeAction } from '../../store/actions/SigninActions';
import { postLogin } from '../../api/sign.api';
import { clearVoteListAction } from '../../store/actions/VoteActions';

const usernameOptions = {
	required: true,
	minLength: 4,
	maxLength: 50,
}

const passwordOptions = {
	required: true,
	minLength: 4,
}

export default function SigninPage() {
	const [error, setError] = useState<string>();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm(); // https://react-hook-form.com/form-builder

	useEffect(() => {
		if (error) {
			// затираем ошибку спустя 3 сек
			setTimeout(() => setError(undefined), 3000);
		}
	}, [error]);

	const onSubmit = async (data: any) => {
		return await postLogin(data.username, data.password)
			.then(() => fetchMeAction()
				.then(data => {
					dispatch(clearVoteListAction());
					dispatch(data);
				})
				.catch(error => {
					if (error.response?.status === 400) {
						setError('Реквизиты не подошли');
					} else if (error.response?.status === 401) {
						setError('Пользвоатель не авторизован');
					} else {
						setError(error.stack);
					}
					return false;
				}),
			);
	};

	return <>
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>Signin</h1>
			<div>
				Username:
				<br />
				<input {...register('username', usernameOptions)} />
				{errors.username ? String(errors.username.message) || 'Заполните поле' : null}
			</div>
			<div>
				Password:
				<br />
				<input {...register('password', passwordOptions)}
				       type="password" autoComplete="current-password webauthn" />
				{errors.password ? String(errors.password.message) || 'Заполните поле' : null}
			</div>
			{error ? <div>Ошибка: {error}</div> : null}
			<input type="submit" disabled={isSubmitting} />
		</form>
	</>;
}
