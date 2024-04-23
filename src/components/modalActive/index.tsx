import Icon from '../common/icon';
import Modal from '../common/modal';

interface IProps {
    className?: string;
}

export default function ModalActive({ className }: IProps) {
    return (
        <Modal
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
            content={<h1>add ativo</h1>}
        />
    );
}
