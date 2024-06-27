'use client';
import React, {
	useState,
	useEffect,
	useMemo,
	ReactNode,
	ChangeEvent,
} from 'react';

interface IProps {
	centDigits?: number;
	value: string | number;
	onChange: (value: number) => void;
}

export default function InputCurrency({
	value,
	centDigits = 2,
	onChange,
}: IProps): ReactNode {
	const [inputValue, setInputValue] = useState<string>(String(value));

	const formatValue = (rawValue: string) => {
		const digits = rawValue.replace(/\D/g, '');

		if (digits === '') {
			return `0,${'0'.repeat(centDigits)}`;
		}

		const integerPart = digits.slice(0, -centDigits) || '0';
		const fractionalPart = digits.slice(-centDigits).padStart(centDigits, '0');

		const formattedIntegerPart = integerPart
			.split('')
			.reverse()
			.reduce<string[]>((acc, digit, index) => {
				if (index > 0 && index % 3 === 0) {
					acc.push('.');
				}
				acc.push(digit);
				return acc;
			}, [])
			.reverse()
			.join('');

		return `${formattedIntegerPart},${fractionalPart}`;
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const rawValue = e.target.value;
		const newValue = formatValue(rawValue);
		setInputValue(newValue);
		onChange(Number(newValue.replace(',', '')));
	};

	useEffect(() => {
		setInputValue(formatValue(String(value).replace(/\D/g, '')));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value, centDigits]);

	const placeholder = useMemo(() => {
		return `0,${'0'.repeat(centDigits)}`;
	}, [centDigits]);

	return (
		<input
			className="p-inputnumber-input p-inputtext p-component p-filled"
			type="text"
			value={inputValue}
			onChange={handleChange}
			inputMode="numeric"
			placeholder={placeholder}
		/>
	);
}
