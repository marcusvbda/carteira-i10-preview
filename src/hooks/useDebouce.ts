import { useRef, useCallback } from 'react';

type Callback = (...args: any[]) => void;

export default function useDebounce(
	callback: Callback,
	delay = 5000,
): Callback {
	const timeoutRef = useRef<number | null>(null);

	const debouncedDispatch = useCallback(
		(...args: any[]) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = window.setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay],
	);

	return debouncedDispatch;
}
