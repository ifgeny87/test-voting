import React from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { clearMeAction } from '../store/actions/SigninActions';
import VoteListPage from '../pages/votes/VoteListPage';
import VoteViewItemPage from '../pages/votes/VoteViewItemPage';
import VoteCreateItemPage from '../pages/votes/VoteCreateItemPage';
import { postLogout } from '../api/sign.api';

export default function AuthorizedContainer() {
	const dispatch = useDispatch();

	const logout = () => {
		postLogout()
			.finally(() => dispatch(clearMeAction()));
	}

	return (
		<>
			<button onClick={logout}>Logout</button>
			<Router basename="/">
				<Routes>
					<Route path="/" element={<VoteListPage />} />
					<Route path="/votes/create" element={<VoteCreateItemPage />} />
					<Route path="/votes/:voteId" element={<VoteViewItemPage />} />
				</Routes>
			</Router>
		</>
	);
}
