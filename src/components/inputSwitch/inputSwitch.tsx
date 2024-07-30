'use client';
import './_styles.scss';
import { useEffect, useState } from 'react';

export default function InputSwitch({ value = false, onChange = null }: any) {
	const [checked, setChecked] = useState(value);

	useEffect(() => {
		onChange && onChange(checked);
	}, [checked, onChange]);

	return (
		<label
			className={`switch ${checked ? 'checked' : ''}`}
			onClick={() => setChecked(!checked)}
		>
			<div className={`switch--toggle ${checked ? 'checked' : ''}`} />
		</label>
	);
}
