export const getCookie = (name: string): string | undefined => {
	const matches = document.cookie.match(new RegExp(
		'(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1') + '=([^;]*)',
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name: string, value: string, options: any = {}) => {
	options = {
		path: '/',
		...options,
	};

	if (options.expires && options.expires.toUTCString) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

	Object.keys(options).forEach(optionKey => {
		updatedCookie += `;${optionKey}`;
		const optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += `=${optionValue}`;
		}
	});

	document.cookie = updatedCookie;
};

const COOKIE_USER_ID = 'Voter-UserId';

export const getCookieUserId = (): string | undefined => getCookie(COOKIE_USER_ID);

export const saveCookieUserId = (cookieUserId: string) => {
	setCookie(COOKIE_USER_ID, cookieUserId, { 'max-age': 86_400_000 });
};
