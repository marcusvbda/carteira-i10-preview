/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import './_styles.scss';
import { ReactNode, useState } from 'react';
import If from '../if';
import Modal from '../modal';

interface IItem {
	id: any;
	name: string;
}
interface IProps {
	title?: string;
	modalTitle?: string;
	btnContent?: ReactNode;
	options?: IItem[];
	action?: (item: any) => void;
	type?: string;
	className?: string;
}

const DropdownSource = ({ btnContent, title, onClick }: any) => {
	return (
		<>
			<If condition={btnContent}>
				<div className="default-dropdown--default-btn" onClick={onClick}>
					{btnContent}
				</div>
			</If>
			<If condition={!btnContent}>
				<button
					type="button"
					className="default-dropdown--btn"
					onClick={onClick}
				>
					{title ? title : 'Selecione'}
					<div className="default-dropdown--btn-arrow" />
				</button>
			</If>
		</>
	);
};

const DropdownContent = ({ options, action }: any) => {
	return (
		<div className="default-dropdown--items">
			{(options || []).map((item: IItem) => (
				<div
					key={item.id}
					className="default-dropdown--item"
					onClick={() => action(item)}
				>
					{item.name}
				</div>
			))}
		</div>
	);
};

export default function Dropdown({
	title,
	btnContent,
	options,
	action,
	modalTitle,
	type,
	className,
}: IProps) {
	const [modalVisible, setModalVisible] = useState(false);
	const handleAction = (item: any) => {
		action && action(item);
		setModalVisible(false);
	};

	return (
		<div className={`default-dropdown ${className || ''}`}>
			<Modal
				type={type}
				setModalVisible={setModalVisible}
				title={modalTitle || ''}
				source={<DropdownSource title={title} btnContent={btnContent} />}
				content={
					<DropdownContent options={options || []} action={handleAction} />
				}
			/>
		</div>
	);
}
