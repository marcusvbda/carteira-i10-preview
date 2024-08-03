import { CSSProperties, ReactNode } from 'react';
import './_styles.scss';

interface IProps {
	value?: string;
	type: string;
	size: string;
	transparent?: boolean;
	strong?: boolean;
	dark?: boolean;
}

export default function Trend({
	value,
	type,
	size,
	transparent,
	strong,
	dark,
}: IProps): ReactNode {
	const transparentClass = transparent ? 'transparent' : '';
	const strongClass = strong ? 'strong' : '';
	const darkClass = dark ? 'dark' : '';
	const formatedValue =
		!isNaN(parseFloat((value || 0) as any)) && value !== 'Infinity' ? value : 0;
	let formateType = type;
	if (formatedValue === 0) {
		formateType = '';
	}

	return (
		<div className="flex">
			<span
				className={`trend-value ${formateType} ${transparentClass} ${strongClass} ${darkClass}`}
				style={{ '--font-size': size } as CSSProperties}
			>
				{value && formatedValue}
				<svg width="12" height="12" viewBox="0 0 12 12" fill="none">
					<path d="M6.99995 3C6.72381 3 6.49995 3.22386 6.49995 3.5C6.49995 3.77614 6.72381 4 6.99995 4H9.29265L6.49976 6.79289L4.85331 5.14645C4.65805 4.95118 4.34146 4.95118 4.1462 5.14645L1.1462 8.14645C0.95094 8.34171 0.95094 8.65829 1.1462 8.85355C1.34146 9.04882 1.65805 9.04882 1.85331 8.85355L4.49976 6.20711L6.1462 7.85355C6.34146 8.04882 6.65805 8.04882 6.85331 7.85355L9.99995 4.70691V7C9.99995 7.27614 10.2238 7.5 10.4999 7.5C10.7761 7.5 11 7.27614 11 7V3.5C11 3.22386 10.7761 3 10.4999 3H6.99995Z" />
				</svg>
			</span>
		</div>
	);
}
