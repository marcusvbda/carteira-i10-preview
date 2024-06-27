import { CSSProperties } from 'react';
import './_styles.scss';

interface IProps {
	className?: string;
	icon: string;
	darkIcon?: string;
	width: string;
	height?: string;
	filter?: string;
	opacity?: string;
	styles?: CSSProperties;
}

export default function Icon({
	className,
	icon,
	width,
	height,
	filter,
	opacity,
	darkIcon,
	styles,
}: IProps) {
	return (
		<span
			className={`icon ${className || ''}`}
			style={
				{
					'--image': `url(${icon})`,
					'--dark-image': `url(${darkIcon || icon})`,
					'--width': width,
					'--height': height || width,
					minWidth: width,
					filter: filter || 'none',
					opacity: opacity || '1',
					...styles,
				} as CSSProperties
			}
		/>
	);
}
