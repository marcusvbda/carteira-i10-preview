import './_styles.scss';

interface IProps {
	value: number;
}

export default function ScoreComponent({ value }: IProps) {
	return (
		<div className="flex">
			<div className="score-component">{value}</div>
		</div>
	);
}
