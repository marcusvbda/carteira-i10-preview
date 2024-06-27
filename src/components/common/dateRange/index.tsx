'use client';
import './_styles.scss';
import { useMemo, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import Icon from '../icon';
import Modal from '../modal';

const Content = ({ startDate, setStartDate, endDate, setEndDate }: any) => {
	const setRange = (days: number) => {
		const end = new Date();
		const start = new Date();
		start.setDate(end.getDate() - days);
		setStartDate(start);
		setEndDate(end);
	};

	return (
		<>
			<div className="recents">
				<h5>Recentes</h5>
				<div className="recent-tags">
					<div className="tag" onClick={() => setRange(30)}>
						30 dias
					</div>
					<div className="tag" onClick={() => setRange(60)}>
						60 dias
					</div>
					<div className="tag" onClick={() => setRange(90)}>
						90 dias
					</div>
				</div>
			</div>
			<div className="calendaries">
				<Calendar
					value={startDate}
					onChange={(e) => setStartDate(e.value as Date)}
					inline
				/>
				<Calendar
					value={endDate}
					onChange={(e) => setEndDate(e.value as Date)}
					inline
				/>
			</div>
		</>
	);
};

export default function DateRange({ onChange }: any) {
	const [startDate, setStartDate] = useState<null | Date>(null);
	const [endDate, setEndDate] = useState<null | Date>(null);
	const [visible, setVisible] = useState(false);
	const [saved, setSaved] = useState(false);

	const handleCancel = (e: any) => {
		e.preventDefault();
		setStartDate(null);
		setEndDate(null);
		setSaved(false);
		setVisible(false);
	};

	const handleSave = (e: any) => {
		e.preventDefault();
		setSaved(true);
		setVisible(false);
		onChange && onChange(startDate, endDate);
	};

	const placeholder = useMemo(() => 'Selecionar ...', []);

	const content = useMemo(() => {
		if (!startDate || !endDate) return placeholder;
		if (!saved) return placeholder;
		const start = (startDate as Date).toLocaleDateString('pt-BR');
		const end = (endDate as Date).toLocaleDateString('pt-BR');
		return `${start} - ${end}`;
	}, [startDate, endDate, placeholder, saved]);

	return (
		<div
			className={`date-range-input ${placeholder !== content && 'selected'}`}
		>
			<Modal
				title="Período"
				size="650px"
				modalVisible={visible}
				setModalVisible={setVisible}
				source={
					<button type="button" className="fake-input">
						<Icon width="16px" icon="/images/theme/calendary-input.svg" />
						{content}
						<Icon
							className="arrow"
							width="12px"
							height="10px"
							icon="/images/theme/input-arrow-down.svg"
						/>
					</button>
				}
				content={
					<Content {...{ startDate, setStartDate, endDate, setEndDate }} />
				}
				footer={
					<>
						<a className="btn small link" href="#" onClick={handleCancel}>
							Cancelar
						</a>
						<button
							className="btn small primary"
							disabled={!startDate || !endDate}
							onClick={handleSave}
						>
							Salvar
						</button>
					</>
				}
			/>
		</div>
	);
}
