import { CSSProperties, useMemo } from 'react';
import './_styles.scss';

interface IProps {
    children: React.ReactNode;
    className?: string;
    onClickHandle?: any;
    padding?: string;
    sizes?: any;
    title?: React.ReactNode;
}

export default function DefaultCard({
    children,
    className,
    onClickHandle,
    padding,
    sizes,
    title
}: IProps) {
    const paddingValue = padding ? padding : '12px 24px';

    const styleSizes = useMemo(() => {
        const size = sizes?.default;
        const tabletSize = sizes?.tabletSize || size;
        const mobileSize = sizes?.mobileSize || size;
        if (size) {
            return {
                '--size': size,
                '--tablet-size': tabletSize,
                '--mobile-size': mobileSize
            };
        }
        return {};
    }, [sizes]);

    return (
        <div
            className={`default-card ${className ? className : ''}`}
            onClick={onClickHandle ? onClickHandle : null}
            style={
                {
                    ...styleSizes
                } as CSSProperties
            }
        >
            {title ? title : <></>}
            <div
                className="modal-content"
                style={{
                    padding: paddingValue
                }}
            >
                {children}
            </div>
        </div>
    );
}
