'use client';
import './_styles.scss';
import { ReactNode, useState } from 'react';

export default function DropdownMenu({ items }: any): ReactNode {
	const [visible, setVisible] = useState(false);

	return (
		<div className="dropdown-menu" onMouseLeave={() => setVisible(false)}>
			<a
				href="#"
				onClick={(e: any) => [e.preventDefault(), setVisible(!visible)]}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="17"
					height="16"
					viewBox="0 0 17 16"
					fill="none"
				>
					<path
						d="M10.25 8C10.25 8.34612 10.1474 8.68446 9.95507 8.97225C9.76278 9.26003 9.48947 9.48434 9.1697 9.61679C8.84993 9.74924 8.49806 9.7839 8.15859 9.71637C7.81913 9.64885 7.50731 9.48218 7.26256 9.23744C7.01782 8.9927 6.85115 8.68087 6.78363 8.34141C6.7161 8.00194 6.75076 7.65007 6.88321 7.3303C7.01567 7.01053 7.23997 6.73722 7.52775 6.54493C7.81554 6.35264 8.15388 6.25 8.5 6.25C8.96413 6.25 9.40925 6.43437 9.73744 6.76256C10.0656 7.09075 10.25 7.53587 10.25 8ZM3.5 6.25C3.15388 6.25 2.81554 6.35264 2.52775 6.54493C2.23997 6.73722 2.01566 7.01053 1.88321 7.3303C1.75076 7.65007 1.7161 8.00194 1.78363 8.34141C1.85115 8.68087 2.01782 8.9927 2.26256 9.23744C2.50731 9.48218 2.81913 9.64885 3.15859 9.71637C3.49806 9.7839 3.84993 9.74924 4.1697 9.61679C4.48947 9.48434 4.76278 9.26003 4.95507 8.97225C5.14737 8.68446 5.25 8.34612 5.25 8C5.25 7.53587 5.06563 7.09075 4.73744 6.76256C4.40925 6.43437 3.96413 6.25 3.5 6.25ZM13.5 6.25C13.1539 6.25 12.8155 6.35264 12.5278 6.54493C12.24 6.73722 12.0157 7.01053 11.8832 7.3303C11.7508 7.65007 11.7161 8.00194 11.7836 8.34141C11.8512 8.68087 12.0178 8.9927 12.2626 9.23744C12.5073 9.48218 12.8191 9.64885 13.1586 9.71637C13.4981 9.7839 13.8499 9.74924 14.1697 9.61679C14.4895 9.48434 14.7628 9.26003 14.9551 8.97225C15.1474 8.68446 15.25 8.34612 15.25 8C15.25 7.77019 15.2047 7.54262 15.1168 7.3303C15.0288 7.11798 14.8999 6.92507 14.7374 6.76256C14.5749 6.60006 14.382 6.47116 14.1697 6.38321C13.9574 6.29526 13.7298 6.25 13.5 6.25Z"
						fill="#778698"
					/>
				</svg>
			</a>
			{visible && (
				<div className="menu-items">
					{items.map((item: any, index: number) => (
						<div className="menu-item" key={index} onClick={item.action}>
							{item.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
