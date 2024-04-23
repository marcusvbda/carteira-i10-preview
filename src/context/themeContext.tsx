'use client';

import { createContext, useCallback, useEffect, useState } from 'react';
import { envoriment } from '@/constants/environment';

export const ThemeContext = createContext<any>({});

export const ThemeProvider = ({ children }: any): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [initialized, setInitialized] = useState(false);
    const [screenPosition, setScreenPosition] = useState(0);
    const [screenSize, setScreenSize] = useState(0);
    const [screenFormat, setScreenFormat] = useState('desktop');
    const [theme, setTheme] = useState(envoriment.defaultTheme || 'light');

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

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
        const localTheme = localStorage.getItem('theme') || theme;
        setTheme(localTheme);
        document.documentElement.setAttribute('data-theme', theme as string);
        setInitialized(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!initialized) return;
        setTimeout(() => {
            localStorage.setItem('theme', theme as string);
            document.documentElement.setAttribute(
                'data-theme',
                theme as string
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    useEffect(() => {
        setTimeout(() => {
            document.documentElement.setAttribute(
                'screen-format',
                screenFormat as string
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenFormat]);

    useEffect(() => {
        setTimeout(() => {
            document.documentElement.setAttribute(
                'screen-size',
                `${screenSize}` as string
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenSize]);

    useEffect(() => {
        setTimeout(() => {
            document.documentElement.setAttribute(
                'is-loading',
                `${isLoading ? 'true' : 'false'}` as string
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        setTimeout(() => {
            document.documentElement.setAttribute(
                'screen-position',
                `${screenPosition}` as string
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screenPosition]);

    if (!initialized) return <></>;

    return (
        <ThemeContext.Provider
            value={{
                theme: theme as string,
                toggleTheme,
                screenFormat,
                screenSize,
                isLoading,
                setIsLoading,
                screenPosition
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
