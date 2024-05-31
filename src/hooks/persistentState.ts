'use client';

import { useState } from 'react';

interface IParams {
	expires?: number;
}

export const usePersistentState = (
	key: string,
	initialValue: any,
	params?: IParams,
) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			if (!item) return initialValue;
			const parsedItem = JSON.parse(item);
			if (params?.expires) {
				const diffTimestampInMinutes =
					(new Date().getTime() - parsedItem.timestamp) / 60000;
				const isExpirated = diffTimestampInMinutes > params.expires;
				if (isExpirated) {
					localStorage.removeItem(key);
					return initialValue;
				}
			}
			return parsedItem.value;
		} catch (error) {
			console.error('Error loading localStorage', error);
			return initialValue;
		}
	});

	const setValue = (value: any) => {
		try {
			setStoredValue(value);
			const newValue = {
				value,
				timestamp: new Date().getTime(),
			};
			localStorage.setItem(key, JSON.stringify(newValue));
		} catch (error) {
			console.error('Error saving to localStorage', error);
		}
	};

	return [storedValue, setValue];
};
