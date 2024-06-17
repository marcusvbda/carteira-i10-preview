interface IEnvoriment {
	[key: string]: string | boolean | number;
}

export const envoriment: IEnvoriment = {
	appName: process.env.NEXT_PUBLIC_APP_NAME || 'App Name',
	defaultTheme: process.env.NEXT_PUBLIC_DEFAULT_THEME || 'light',
	apiUrl: process.env.NEXT_PUBLIC_SERVER_URI || 'http://localhost',
	defaultShowSensitiveContent:
		process.env.NEXT_PUBLIC_DEFAULT_SHOW_SENSITIVE_CONTENT || true,
};
