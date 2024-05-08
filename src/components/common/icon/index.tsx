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
}

export default function Icon({
    className,
    icon,
    width,
    height,
    filter,
    opacity,
    darkIcon
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
                    filter: filter || 'none',
                    opacity: opacity || '1'
                } as CSSProperties
            }
        />
    );
}
