'use client';
import './_styles.scss';

interface IProps {
	options: string[];
	value: number;
	onChange: any;
}

export default function RadioTab({ options, value, onChange }: IProps) {
	return (
		<div className="radio-tab-section">
			<div className="radio-tab">
				{options.map((option: string, index: number) => (
					<div
						key={option}
						className={`radio-tab--option ${index === value ? 'checked' : ''}`}
						onClick={() => onChange(index)}
					>
						{option}
					</div>
				))}
			</div>
		</div>
	);
}
