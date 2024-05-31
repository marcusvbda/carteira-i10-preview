'use client';
import { ReactNode, useContext, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import DefaultCard from '@/components/cards/default';
import Icon from '@/components/common/icon';
import InputSwitch from '@/components/inputSwitch/inputSwitch';
import RadioTab from '@/components/radioTab/radioTab';
import { ThemeContext } from '@/context/themeContext';

const CardTitle = ({ title }: any): ReactNode => {
	const [selectedOption, setSelectedOption] = useState(0);
	return (
		<div className="header-title">
			<h4>{title}</h4>
			<RadioTab
				options={['Tipo de ativos', 'Ativos', 'Exposição ao exterior']}
				value={selectedOption}
				onChange={setSelectedOption}
			/>
			<div>
				<div className="switch-position">
					Exibir posição ideal
					<Icon icon={'/images/theme/question.svg'} width="20px" />
					<InputSwitch />
				</div>
			</div>
		</div>
	);
};

const ActiveCard = ({ title }: any): ReactNode => {
	const { theme } = useContext(ThemeContext);

	const option = useMemo(
		() => ({
			backgroundColor: 'transparent',
			tooltip: {
				trigger: 'item',
			},
			legend: {
				type: 'scroll',
				orient: 'vertical',
				right: 10,
				top: 20,
				bottom: 20,
				data: ['Search Engine', 'Direct', 'Email', 'Union Ads', 'Video Ads'],
			},
			series: [
				{
					type: 'pie',
					radius: ['65%', '90%'],
					center: ['25%', '50%'],
					avoidLabelOverlap: false,
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						},
					},
					data: [
						{ value: 1048, name: 'Search Engine' },
						{ value: 735, name: 'Direct' },
						{ value: 580, name: 'Email' },
						{ value: 484, name: 'Union Ads' },
						{ value: 300, name: 'Video Ads' },
					],
				},
			],
		}),
		[],
	);

	return (
		<DefaultCard className="active-card" title={<CardTitle title={title} />}>
			<div style={{ height: 450, padding: '50px 0' }}>
				<ReactECharts
					theme={theme}
					option={option}
					style={{ height: '100%' }}
				/>
			</div>
		</DefaultCard>
	);
};

export default function ConsolidationChats(): ReactNode {
	return (
		<div className="consolidation-chats">
			<h4 className="principal-title ">Consolidação do patrimônio</h4>
			<ActiveCard title="Consolidação" />
			<ActiveCard title="Ações" />
			<ActiveCard title="FIIs" />
			<ActiveCard title="Criptomoedas" />
		</div>
	);
}
