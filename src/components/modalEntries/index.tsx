'use client';
import './_styles.scss';
import { ReactNode, useEffect, useState } from 'react';
import Icon from '../common/icon';
import Modal from '../common/modal';
import FormEntry from './_formEntry';

interface IProps {
	className?: string;
	tickerType?: string;
	hideText?: boolean;
	defaultSource?: ReactNode;
}

const MessageForm = ({ setShowAlert, defaultVisible }: any) => {
	const [visible, setVisible] = useState(defaultVisible || false);

	useEffect(() => {
		setShowAlert(visible);
	}, [visible, setShowAlert]);

	return (
		<div className="alert-message success">
			<h4>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
				>
					<path
						d="M8 1.5C6.71442 1.5 5.45772 1.88122 4.3888 2.59545C3.31988 3.30968 2.48676 4.32484 1.99479 5.51256C1.50282 6.70028 1.37409 8.00721 1.6249 9.26809C1.8757 10.529 2.49477 11.6872 3.40381 12.5962C4.31285 13.5052 5.47104 14.1243 6.73192 14.3751C7.99279 14.6259 9.29973 14.4972 10.4874 14.0052C11.6752 13.5132 12.6903 12.6801 13.4046 11.6112C14.1188 10.5423 14.5 9.28558 14.5 8C14.4982 6.27665 13.8128 4.62441 12.5942 3.40582C11.3756 2.18722 9.72335 1.50182 8 1.5ZM10.8538 6.85375L7.35375 10.3538C7.30732 10.4002 7.25217 10.4371 7.19147 10.4623C7.13077 10.4874 7.06571 10.5004 7 10.5004C6.9343 10.5004 6.86923 10.4874 6.80853 10.4623C6.74783 10.4371 6.69269 10.4002 6.64625 10.3538L5.14625 8.85375C5.05243 8.75993 4.99972 8.63268 4.99972 8.5C4.99972 8.36732 5.05243 8.24007 5.14625 8.14625C5.24007 8.05243 5.36732 7.99972 5.5 7.99972C5.63268 7.99972 5.75993 8.05243 5.85375 8.14625L7 9.29313L10.1463 6.14625C10.1927 6.09979 10.2479 6.06294 10.3086 6.0378C10.3693 6.01266 10.4343 5.99972 10.5 5.99972C10.5657 5.99972 10.6308 6.01266 10.6915 6.0378C10.7521 6.06294 10.8073 6.09979 10.8538 6.14625C10.9002 6.1927 10.9371 6.24786 10.9622 6.30855C10.9873 6.36925 11.0003 6.4343 11.0003 6.5C11.0003 6.5657 10.9873 6.63075 10.9622 6.69145C10.9371 6.75214 10.9002 6.8073 10.8538 6.85375Z"
						fill="#009974"
					/>
				</svg>
				Ativo adicionado com sucesso
			</h4>
			<span>
				Pode levar até 5 minutos para o ativo aparecer em sua carteira
			</span>
			<a href="#" className="alert-close" onClick={() => setVisible(false)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="8"
					height="8"
					viewBox="0 0 8 8"
					fill="none"
				>
					<path
						d="M7.88278 7.31681C7.91995 7.35398 7.94942 7.39809 7.96954 7.44665C7.98965 7.4952 8 7.54724 8 7.5998C8 7.65235 7.98965 7.70439 7.96954 7.75295C7.94942 7.8015 7.91995 7.84562 7.88278 7.88278C7.84562 7.91995 7.8015 7.94942 7.75295 7.96954C7.70439 7.98965 7.65235 8 7.5998 8C7.54724 8 7.4952 7.98965 7.44665 7.96954C7.39809 7.94942 7.35398 7.91995 7.31681 7.88278L4 4.56547L0.683184 7.88278C0.608132 7.95784 0.50634 8 0.4002 8C0.29406 8 0.192268 7.95784 0.117216 7.88278C0.0421638 7.80773 2.09227e-09 7.70594 0 7.5998C-2.09227e-09 7.49366 0.0421638 7.39187 0.117216 7.31681L3.43453 4L0.117216 0.683184C0.0421638 0.608132 -7.90802e-10 0.50634 0 0.4002C7.90802e-10 0.29406 0.0421638 0.192268 0.117216 0.117216C0.192268 0.0421638 0.29406 7.90802e-10 0.4002 0C0.50634 -7.90802e-10 0.608132 0.0421638 0.683184 0.117216L4 3.43453L7.31681 0.117216C7.39187 0.0421638 7.49366 -2.09227e-09 7.5998 0C7.70594 2.09227e-09 7.80773 0.0421638 7.88278 0.117216C7.95784 0.192268 8 0.29406 8 0.4002C8 0.50634 7.95784 0.608132 7.88278 0.683184L4.56547 4L7.88278 7.31681Z"
						fill="#778698"
					/>
				</svg>
			</a>
		</div>
	);
};

export default function ModalEntries({
	className,
	tickerType,
	hideText,
	defaultSource,
}: IProps) {
	const [modalVisible, setModalVisible] = useState(false);
	const [showAlert, setShowAlert] = useState(false);

	const closeModal = () => {
		setModalVisible(false);
	};

	return (
		<Modal
			modalVisible={modalVisible}
			setModalVisible={setModalVisible}
			size="650px"
			title="Adicionar Ativo"
			source={
				defaultSource || (
					<button className={`btn primary ${className || ''}`}>
						<Icon icon="/images/theme/plus.svg" width="16px" />
						{hideText ? null : <label>Adicionar Ativo</label>}
					</button>
				)
			}
			content={
				<>
					{showAlert && (
						<MessageForm
							setShowAlert={setShowAlert}
							defaultVisible={showAlert}
						/>
					)}
					<FormEntry
						closeModal={closeModal}
						tickerType={tickerType}
						onSubmitAction={() => setShowAlert(true)}
					/>
				</>
			}
		/>
	);
}
