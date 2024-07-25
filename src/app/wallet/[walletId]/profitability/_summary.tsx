import DefaultCard from '@/components/cards/default';
import Trend from '@/components/common/trend';

export default function Summary({ data }: any) {
	const formatResult = (value: number) => {
		const val = value.toFixed(2);
		return val.endsWith('.00') ? val.replace('.00', '') : val;
	};

	return (
		<div className="summary">
			<DefaultCard className="metric-card box-profitabily">
				<h4>Total</h4>
				<div>
					<small>Rentabilidade</small>
				</div>
				<Trend
					type={data.total.value > 0 ? 'positive' : 'negative'}
					size="20px"
					value={`${formatResult(data.total.value)}%`}
					transparent
				/>
				<div>
					<small>{data.total.description}</small>
				</div>
			</DefaultCard>
			<DefaultCard className="metric-card box-last12">
				<h4>Últimos 12 meses</h4>
				<div>
					<small>Rentabilidade</small>
				</div>
				<Trend
					type={data.last_12_months.value > 0 ? 'positive' : 'negative'}
					size="20px"
					value={`${formatResult(data.last_12_months.value)}%`}
					transparent
				/>
				<div>
					<small>{data.last_12_months.description}</small>
				</div>
			</DefaultCard>
			<DefaultCard className="metric-card box-last4">
				<h4>Último mês</h4>
				<div>
					<small>Rentabilidade</small>
				</div>
				<Trend
					type={data.last_month.value > 0 ? 'positive' : 'negative'}
					size="20px"
					value={`${formatResult(data.last_month.value)}%`}
					transparent
				/>
				<div>
					<small>{data.last_month.description}</small>
				</div>
			</DefaultCard>
		</div>
	);
}
