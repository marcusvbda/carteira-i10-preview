'use client';

import { useState } from 'react';

interface IParams {
    parse?: boolean;
}

export const usePersistentState = (
    key: string,
    initialValue: any,
    params?: IParams
) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (!item) return initialValue;
            return params?.parse ? JSON.parse(item as string) : item;
        } catch (error) {
            console.error('Error loading localStorage', error);
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            setStoredValue(value);
            localStorage.setItem(
                key,
                params?.parse ? JSON.stringify(value) : value
            );
        } catch (error) {
            console.error('Error saving to localStorage', error);
        }
    };

    return [storedValue, setValue];
};
