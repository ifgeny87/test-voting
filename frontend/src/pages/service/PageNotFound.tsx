import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
	return <>
		<h1>Страница не найдена</h1>
		<Link to="/">На главную</Link>
	</>;
}
