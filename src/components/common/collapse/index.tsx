'use client';
import { useEffect, useState } from 'react';
import './_styles.scss';
import If from '@/components/common/if';
import Icon from '../icon';

interface IProps {
    source: JSX.Element;
    content: JSX.Element;
    defaultCollapsed?: boolean;
    paddingSource?: string;
    onChange?: (value: boolean) => void;
}

const CollapseBtn = ({ visible }: any) => {
    return (
        <button className={`collapse-btn ${!visible ? 'collapsed' : ''}`}>
            <Icon icon="/images/theme/secondary-arrow-down.svg" width="16px" />
        </button>
    );
};

export default function Collapse({
    source,
    content,
    defaultCollapsed,
    paddingSource,
    onChange
}: IProps) {
    const [visible, setVisible] = useState(defaultCollapsed ?? false);

    useEffect(() => {
        onChange && onChange(visible);
    }, [visible, onChange]);

    return (
        <div className="collapse-component">
            <div
                className="collapse-component--source"
                onClick={() => setVisible(!visible)}
                style={{ padding: paddingSource ? paddingSource : '12px 24px' }}
            >
                {source}
                <CollapseBtn visible={visible} />
            </div>
            <If condition={visible}>
                <div className="collapse-component--content">
                    <>{content}</>
                </div>
            </If>
        </div>
    );
}
