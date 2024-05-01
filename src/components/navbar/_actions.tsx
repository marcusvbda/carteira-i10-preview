'use client';
import { DefinitionsContext } from '@/context/definitionsContext';
import { ThemeContext } from '@/context/themeContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

export default function Actions(): JSX.Element {
    const router = useRouter();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { showSensitiveContent, toggleShowSensitiveContent } =
        useContext(DefinitionsContext);
    const showHelp = () => router.push('/help');
    return (
        <div className="actions">
            <button
                className={`eye ${
                    showSensitiveContent ? 'showing' : 'hidding'
                }`}
                onClick={toggleShowSensitiveContent}
            />
            <button className={`theme ${theme}`} onClick={toggleTheme} />
            <button className="help" onClick={showHelp} />
        </div>
    );
}
