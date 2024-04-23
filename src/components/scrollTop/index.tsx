'use client';
import './_styles.scss';
import { useContext, useMemo } from 'react';
import { ThemeContext } from '@/context/themeContext';

export default function ScrollToTop(): JSX.Element {
    const { screenPosition } = useContext(ThemeContext);
    const breakpoint = 150;
    const isVisible = useMemo(
        () => screenPosition > breakpoint,
        [screenPosition]
    );
    const scrollToUp = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    if (!isVisible) return <></>;
    return <button className="scroll-top" onClick={scrollToUp} />;
}
