'use client';
import { ReactNode, useEffect, useState } from 'react';
import './_styles.scss';
import AspectRatio from '../aspectRatio';

export default function RadioType({
	value,
	options,
	onChange,
}: any): ReactNode {
	const [values, setValues] = useState(value ? value : []);

	const handleClick = (id: any) => {
		if (values.includes(id)) {
			setValues(values.filter((x: any) => x !== id));
		} else {
			setValues([...values, id]);
		}
	};

	useEffect(() => {
		onChange && onChange(values);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [values]);

	return (
		<div className="radio-type">
			{options.map((x: any, index: number) => (
				<div
					className={`radio-type--item ${values.includes(x.id) && 'selected'}`}
					key={index}
					onClick={() => handleClick(x.id)}
				>
					{x.icon && <AspectRatio size={{ width: 16 }} src={x.icon} />}
					{x.text}
					<AspectRatio
						size={{ width: 16 }}
						src="/images/theme/check-white.svg"
					/>
				</div>
			))}
		</div>
	);
}
