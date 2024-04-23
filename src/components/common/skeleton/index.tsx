import './_styles.scss';

interface IProps {
    width?: string;
    height?: string;
}

export default function Skeleton({ width, height }: IProps): JSX.Element {
    const sizes = [width || '100%', height || '50px'];

    return (
        <div
            className="skeleton"
            style={{ width: sizes[0], height: sizes[1] }}
        />
    );
}
