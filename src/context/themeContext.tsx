'use client';

import {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { envoriment } from '@/constants/environment';
import { usePersistentState } from '@/hooks/persistentState';
import useDebouce from '@/hooks/useDebouce';
export const ThemeContext = createContext<any>({});

export const ThemeProvider = ({ children }: any): ReactNode => {
	const [visible, setVisible] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [initialized, setInitialized] = useState(false);
	const [screenPosition, setScreenPosition] = useState(0);
	const [screenSize, setScreenSize] = useState(0);
	const [screenFormat, setScreenFormat] = useState('desktop');
	const [theme, setTheme] = usePersistentState(
		'theme',
		envoriment.defaultTheme || 'light',
	);

	const toggleTheme = useCallback(() => {
		const value = theme === 'light' ? 'dark' : 'light';
		setTheme(value);
		document.documentElement.setAttribute('data-theme', value as string);
	}, [setTheme, theme]);

	useEffect(() => {
		const handleResize = () => {
			const size = window.innerWidth;
			setScreenSize(size);
			if (size >= 1024) setScreenFormat('desktop');
			else if (size >= 800) setScreenFormat('tablet');
			else setScreenFormat('mobile');
		};
		window.addEventListener('resize', handleResize);
		const handlePageScroll = () => {
			setScreenPosition(window.scrollY);
		};
		window.addEventListener('scroll', handlePageScroll);
		handleResize();
		setInitialized(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const reloadPageDebouce = useDebouce(() => {
		setVisible(false);
		setTimeout(() => {
			setVisible(true);
		}, 500);
	}, 1000);
	useEffect(() => {
		const handleResize = () => reloadPageDebouce();
		window.addEventListener('resize', handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme as string);
	}, [theme]);

	useEffect(() => {
		document.documentElement.setAttribute(
			'screen-format',
			screenFormat as string,
		);
	}, [screenFormat]);

	useEffect(() => {
		document.documentElement.setAttribute(
			'screen-size',
			`${screenSize}` as string,
		);
	}, [screenSize]);

	useEffect(() => {
		document.documentElement.setAttribute(
			'is-loading',
			`${isLoading ? 'true' : 'false'}` as string,
		);
	}, [isLoading]);

	useEffect(() => {
		document.documentElement.setAttribute(
			'screen-position',
			`${screenPosition}` as string,
		);
	}, [screenPosition]);

	if (!initialized) return <></>;
	if (!visible) return <></>;

	return (
		<ThemeContext.Provider
			value={{
				theme: theme as string,
				toggleTheme,
				screenFormat,
				screenSize,
				isLoading,
				setIsLoading,
				screenPosition,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};
