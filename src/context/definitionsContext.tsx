'use client';

import { createContext, useEffect, useState } from 'react';
import { envoriment } from '@/constants/environment';

export const DefinitionsContext = createContext<any>({});

export const DefinitionsProvider = ({ children }: any): JSX.Element => {
    const [initialized, setInitialized] = useState(false);
    const [showSensitiveContent, setShowSensitiveContent] = useState(
        (envoriment.defaultShowSensitiveContent || true) as boolean
    );

    const toggleShowSensitiveContent = (): void => {
        setShowSensitiveContent(!showSensitiveContent);
    };

    useEffect(() => {
        const localShowSensitiveContent =
            localStorage.getItem('show-sensitive-content') === 'true';
        setShowSensitiveContent(localShowSensitiveContent);
        setInitialized(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!initialized) return;
        setTimeout(() => {
            localStorage.setItem(
                'show-sensitive-content',
                showSensitiveContent ? 'true' : 'false'
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showSensitiveContent]);

    if (!initialized) return <></>;

    return (
        <DefinitionsContext.Provider
            value={{
                showSensitiveContent,
                toggleShowSensitiveContent
            }}
        >
            {children}
        </DefinitionsContext.Provider>
    );
};
