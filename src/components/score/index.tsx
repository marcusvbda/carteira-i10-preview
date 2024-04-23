import './_styles.scss';

interface IProps {
    value: number;
}

export default function ScoreComponent({ value }: IProps) {
    return (
        <div className="flex">
            <div className="score-component">10</div>
        </div>
    );
}
