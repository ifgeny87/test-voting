import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { clearMeAction } from '../store/actions/SigninActions';
import VoteListPage from '../pages/votes/VoteListPage';
import VoteViewItemPage from '../pages/votes/VoteViewItemPage';
import VoteCreateItemPage from '../pages/votes/VoteCreateItemPage';
import { postLogout } from '../api/sign.api';
import VoteEditItemPage from '../pages/votes/VoteEditItemPage';
import PageNotFound from '../pages/service/PageNotFound';

export default function AuthorizedContainer() {
	const dispatch = useDispatch();

	const logout = () => {
		postLogout()
			.finally(() => dispatch(clearMeAction()));
	}

	return (
		<>
			<button onClick={logout}>Выход</button>
			<Router basename="/">
				<Routes>
					<Route path="/" element={<VoteListPage />} />
					<Route path="/votes/create" element={<VoteCreateItemPage />} />
					<Route path="/votes/edit/:voteId" element={<VoteEditItemPage />} />
					<Route path="/votes/view/:voteId" element={<VoteViewItemPage />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Router>
		</>
	);
}
