'use client';
import { useState } from 'react';
import Select2 from 'react-select2-wrapper';
import AlertSection from '../alertSection';
import Icon from '../common/icon';
import Modal from '../common/modal';
import 'react-select2-wrapper/css/select2.css';
import './_styles.scss';

interface IProps {
	row: any;
	type: string;
	onSubmit: any;
}

const FormScore = ({ row, type, setModalVisible, onSubmit }: any) => {
	const [score, setScore] = useState(String(parseInt(row.raw_rating)));

	const types: any = {
		ticker: 'Açoes',
	};

	const Percentage = () => {
		return <span>(0%)</span>;
	};

	const submit = () => {
		onSubmit(score);
		setModalVisible(false);
		fetch(`/api/ticker-update`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: row.id, rating: score }),
		});
	};

	return (
		<div className="form-score">
			<AlertSection
				size="20px"
				title={
					<>
						<Icon icon="/images/theme/score.svg" width="20px" />
						Porcentagem ideal do ativo
					</>
				}
			>
				Com base na nota dada para este ativo e com base na % ideal que deseja
				ter em {types[type.toLowerCase()]} <Percentage />, vamos calcular a %
				ideal que você deve ter de {row.ticker_name}.
			</AlertSection>

			<table>
				<tr>
					<th>Ativo</th>
					<th>Nota</th>
				</tr>
				<tr>
					<td>
						<div dangerouslySetInnerHTML={{ __html: row.ticker }} />
					</td>
					<td>
						<Select2
							value={score}
							onSelect={(e: any) => {
								setScore(e.target.value);
							}}
							data={Array.from({ length: 100 }, (_, i) => i).map((option) => ({
								id: option,
								text: option,
							}))}
							options={{
								minimumResultsForSearch: -1,
							}}
						/>
					</td>
				</tr>
			</table>
			<div className="form-footer">
				<button
					className="btn link"
					style={{ paddingLeft: 0 }}
					onClick={() => setModalVisible(false)}
				>
					Cancelar
				</button>
				<button className="btn primary" onClick={() => submit()}>
					Salvar
				</button>
			</div>
		</div>
	);
};

export default function ScoreComponent({ row, type, onSubmit }: IProps) {
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<div className="flex rating-component">
			<Modal
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				size="650px"
				title="Nota do Ativo"
				source={
					<div
						className="score-component"
						onClick={() => setModalVisible(true)}
					>
						{row?.raw_rating || 0}
					</div>
				}
				content={
					<FormScore
						type={type}
						row={row}
						setModalVisible={setModalVisible}
						onSubmit={onSubmit}
					/>
				}
			/>
		</div>
	);
}
