import './_styles.scss';

import { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
interface IProps {
	title?: string;
	content: string;
	children: ReactNode;
}

export default function Tooltip({
	title,
	content,
	children,
}: IProps): ReactNode {
	const [width, setWidth] = useState(200);
	const [visible, setVisible] = useState(false);
	const ref = useRef(null);
	useEffect(() => {
		setWidth((ref.current as any).offsetWidth);
	}, [ref]);

	return (
		<div
			className={`tooltip ${visible && 'show'}`}
			onMouseEnter={() => setVisible(true)}
			onMouseLeave={() => setVisible(false)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="13"
				height="5"
				viewBox="0 0 13 5"
				fill="none"
			>
				<path
					d="M5.1784 1.46845L3.00345 3.88506C2.36472 4.59475 1.45479 5 0.5 5H12.5C11.5452 5 10.6353 4.59475 9.99655 3.88506L7.8216 1.46845C7.11529 0.683658 5.88471 0.683659 5.1784 1.46845Z"
					fill="#2C3A53"
				/>
			</svg>
			<div
				className={`tooltip-content`}
				ref={ref}
				style={{ '--tooltip-width': `${width}px` } as CSSProperties}
			>
				{title ? <strong>{title}</strong> : <> </>}
				<div>{content}</div>
			</div>
			{children}
		</div>
	);
}
