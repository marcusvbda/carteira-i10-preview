'use client';
import './_styles.scss';

import { useMemo, ReactNode } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Icon from '@/components/common/icon';
import 'react-select2-wrapper/css/select2.css';
import ModalCreate, { CreateGoalBtn } from './_goalCreate';

export const GoalItem = (): ReactNode => {
	return (
		<div className="goal-item">
			<div className="item-header">
				<div className="gray-icon">
					<Icon icon="/images/theme/patrimony-icon.svg" width="16px" />
				</div>
				Total de patrimônio
				<svg
					style={{ marginLeft: 'auto' }}
					xmlns="http://www.w3.org/2000/svg"
					width="21"
					height="20"
					viewBox="0 0 21 20"
					fill="none"
				>
					<path
						d="M12.6875 10C12.6875 10.4326 12.5592 10.8556 12.3188 11.2153C12.0785 11.575 11.7368 11.8554 11.3371 12.021C10.9374 12.1866 10.4976 12.2299 10.0732 12.1455C9.64891 12.0611 9.25913 11.8527 8.95321 11.5468C8.64728 11.2409 8.43894 10.8511 8.35453 10.4268C8.27013 10.0024 8.31345 9.5626 8.47901 9.16288C8.64458 8.76317 8.92496 8.42153 9.28469 8.18116C9.64442 7.9408 10.0674 7.8125 10.5 7.8125C11.0802 7.8125 11.6366 8.04297 12.0468 8.45321C12.457 8.86344 12.6875 9.41984 12.6875 10ZM10.5 5.9375C10.9326 5.9375 11.3556 5.80921 11.7153 5.56884C12.075 5.32848 12.3554 4.98683 12.521 4.58712C12.6866 4.18741 12.7299 3.74757 12.6455 3.32324C12.5611 2.89891 12.3527 2.50913 12.0468 2.2032C11.7409 1.89728 11.3511 1.68894 10.9268 1.60453C10.5024 1.52013 10.0626 1.56345 9.66288 1.72901C9.26317 1.89458 8.92153 2.17496 8.68116 2.53469C8.4408 2.89442 8.3125 3.31735 8.3125 3.75C8.3125 4.33016 8.54297 4.88656 8.95321 5.2968C9.36344 5.70703 9.91984 5.9375 10.5 5.9375ZM10.5 14.0625C10.0674 14.0625 9.64442 14.1908 9.28469 14.4312C8.92496 14.6715 8.64458 15.0132 8.47901 15.4129C8.31345 15.8126 8.27013 16.2524 8.35453 16.6768C8.43894 17.1011 8.64728 17.4909 8.95321 17.7968C9.25913 18.1027 9.64891 18.3111 10.0732 18.3955C10.4976 18.4799 10.9374 18.4366 11.3371 18.271C11.7368 18.1054 12.0785 17.825 12.3188 17.4653C12.5592 17.1056 12.6875 16.6826 12.6875 16.25C12.6875 15.6698 12.457 15.1134 12.0468 14.7032C11.6366 14.293 11.0802 14.0625 10.5 14.0625Z"
						fill="#778698"
					/>
				</svg>
			</div>
			<div className="item-content">
				<div className="percentage-value">
					<CircularProgress
						value={23}
						size={'100%'}
						variant="determinate"
						sx={{
							color: '#1f2d47',
						}}
					/>
					<label>23%</label>
				</div>
				<div className="column">
					<div className="row">
						<label>Atual</label>
						<div className="value">R$ 27.7000,00</div>
					</div>
					<div className="row">
						<label>Faltam</label>
						<div className="value warning">R$ 769.100,00</div>
					</div>
				</div>
				<div className="column">
					<div className="row">
						<label>Objetivo</label>
						<div className="value">R$ 1.000.700,00</div>
					</div>
					<div className="row">
						<label>Conclusão estimada</label>
						<div className="value small">Dezembro/27</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const GoalList = ({ goals }: any): ReactNode => {
	return (
		<div className="goal-list">
			<div className="header-title">
				<strong>Metas de andamento</strong>
				<CreateGoalBtn text="Criar nova meta" />
			</div>
			{goals.map((x: any, index: number) => (
				<GoalItem key={index} />
			))}
		</div>
	);
};

export default function GoalsCrud(): ReactNode {
	const goals = useMemo(() => {
		return [
			{
				current: 277000,
				goal: 10007000,
				dueDate: 'Dezembro/27',
			},
			{
				current: 123000,
				goal: 20002000,
				dueDate: 'Dezembro/27',
			},
		];
	}, []);

	return <>{goals.length ? <GoalList goals={goals} /> : <ModalCreate />}</>;
}
