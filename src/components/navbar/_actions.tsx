'use client';
import { ReactNode, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { DefinitionsContext } from '@/context/definitionsContext';
import { ThemeContext } from '@/context/themeContext';

export default function Actions(): ReactNode {
	const router = useRouter();
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { showSensitiveContent, toggleShowSensitiveContent } =
		useContext(DefinitionsContext);
	const showHelp = () => router.push('/help');
	return (
		<div className="actions">
			<button
				className={`eye ${showSensitiveContent ? 'showing' : 'hidding'}`}
				onClick={toggleShowSensitiveContent}
			/>
			<button className={`theme ${theme}`} onClick={toggleTheme} />
			<button className="help" onClick={showHelp} />
		</div>
	);
}
