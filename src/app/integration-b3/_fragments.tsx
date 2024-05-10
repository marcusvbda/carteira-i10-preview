'use client';

import Icon from '@/components/common/icon';
import { useState } from 'react';

const DisconnectedContent = () => {
    return (
        <>
            <Icon
                icon="/images/theme/b3-color-logo.svg"
                width="64px"
                height="56px"
            />
            <div className="description">
                Conecte sua conta da B3 para ter acesso a todas as suas
                operações e acompanhar o desempenho de suas carteiras.
            </div>
            <button className="btn dark">
                <Icon icon="/images/theme/connect.svg" width="16px" />
                Conectar com a B3
            </button>
        </>
    );
};

const ConnectedContent = () => {
    return (
        <>
            <div className="content-header">
                <Icon
                    icon="/images/theme/b3-color-logo.svg"
                    width="64px"
                    height="56px"
                />
                <button className="settings-link">
                    <Icon icon="/images/theme/gear.svg" width="20px" />
                </button>
            </div>
            <div className="badge-activated">Ativada</div>
            <div className="description">
                <p>Última consulta: 20/04/2024 5:14</p>
                <p>196 ativos sincronizados</p>
            </div>
            <button className="remove-link">
                <Icon icon="/images/theme/trash.svg" width="16px" />
                Removar integração
            </button>
        </>
    );
};

export default function Fragments(): JSX.Element {
    const [connected, setConnected] = useState(false);

    return (
        <div className="page-container b3">
            <div className="b3-container">
                <div className="b3-title">
                    <h4>Integração B3</h4>
                </div>
                <div className={`b3-content ${connected && 'connected'}`}>
                    <div className="b3-content--card">
                        {connected ? (
                            <ConnectedContent />
                        ) : (
                            <DisconnectedContent />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
