'use client';
import { ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { seo } from '@/constants/seo';
import { DefinitionsContext } from '@/context/definitionsContext';
import { ThemeContext } from '@/context/themeContext';

interface IProps {
	isPublicRoute: boolean;
}

export default function Actions({ isPublicRoute }: IProps): ReactNode {
	const router = useRouter();
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { showSensitiveContent, toggleShowSensitiveContent } =
		useContext(DefinitionsContext);
	const showHelp = () => router.push(seo.help.path);
	return (
		<div className="actions">
			{!isPublicRoute && (
				<button
					className={`eye ${showSensitiveContent ? 'showing' : 'hidding'}`}
					onClick={toggleShowSensitiveContent}
				/>
			)}
			<button className={`theme ${theme}`} onClick={toggleTheme} />
			<button className="help" onClick={showHelp} />
		</div>
	);
}
