import React from 'react';
import SigninPage from '../pages/sign/SigninPage';
import SignupPage from '../pages/sign/SignupPage';

export default function UnauthorizedContainer() {
	return <>
		<SigninPage />
		<SignupPage />
	</>;
}
