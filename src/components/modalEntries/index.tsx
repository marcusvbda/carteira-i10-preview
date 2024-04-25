'use client';
import './_styles.scss';
import Icon from '../common/icon';
import Modal from '../common/modal';
import { useState } from 'react';
import FormEntry from './_formEntry';

interface IProps {
    className?: string;
    tickerType?: string;
}

export default function ModalEntries({ className, tickerType }: IProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            size="50%"
            tabletSize="80%"
            mobileSize="90%"
            title="Adicionar Ativo"
            source={
                <button className={`btn primary ${className ? className : ''}`}>
                    <Icon icon="/images/theme/plus.svg" width="16px" />
                    Adicionar Ativo
                </button>
            }
            content={
                <FormEntry closeModal={closeModal} tickerType={tickerType} />
            }
        />
    );
}
