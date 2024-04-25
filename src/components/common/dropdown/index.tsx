import './_styles.scss';
import Modal from '../modal';
import If from '../if';
import { useState } from 'react';

interface IItem {
    id: any;
    name: string;
}
interface IProps {
    title?: string;
    modalTitle?: string;
    btnContent?: JSX.Element;
    options?: IItem[];
    action?: (item: any) => void;
}

const DropdownSource = ({ btnContent, title, onClick }: any) => {
    return (
        <>
            <If condition={btnContent}>
                <div
                    className="default-dropdown--default-btn"
                    onClick={onClick}
                >
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
    modalTitle
}: IProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const handleAction = (item: any) => {
        action && action(item);
        setModalVisible(false);
    };

    return (
        <div className="default-dropdown">
            <Modal
                setModalVisible={setModalVisible}
                title={modalTitle ? modalTitle : ''}
                source={
                    <DropdownSource title={title} btnContent={btnContent} />
                }
                content={
                    <DropdownContent
                        options={options || []}
                        action={handleAction}
                    />
                }
            />
        </div>
    );
}
