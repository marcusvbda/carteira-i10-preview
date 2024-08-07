import { CSSProperties, ReactNode, useMemo } from 'react';
import './_styles.scss';

interface IProps {
	children: ReactNode;
	className?: string;
	onClickHandle?: any;
	padding?: string;
	sizes?: any;
	title?: ReactNode;
	footer?: ReactNode;
	style?: CSSProperties;
	modalContentStyles?: CSSProperties;
}

export default function DefaultCard({
	children,
	className,
	onClickHandle,
	padding,
	sizes,
	title,
	footer,
	style,
	modalContentStyles,
}: IProps) {
	const paddingValue = padding ? padding : '12px 24px';

	const styleSizes = useMemo(() => {
		const size = sizes?.default;
		if (size) {
			return {
				'--size': size,
			};
		}
		return {};
	}, [sizes]);

	return (
		<div
			className={`default-card ${className || ''}`}
			onClick={onClickHandle ? onClickHandle : null}
			style={
				{
					...styleSizes,
					...(style || {}),
				} as CSSProperties
			}
		>
			{title || <></>}
			<div
				className="modal-content"
				style={{
					padding: paddingValue,
					...(modalContentStyles || {}),
				}}
			>
				{children}
			</div>
			{footer || <></>}
		</div>
	);
}
