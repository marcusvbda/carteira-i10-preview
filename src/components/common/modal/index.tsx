'use client';
import { useCallback, useEffect, useState } from 'react';
import './_styles.scss';
import If from '@/components/common/if';
import DefaultCard from '@/components/cards/default';

interface IProps {
    source: JSX.Element;
    content: JSX.Element;
    closeOnClick?: boolean;
    hideHeader?: boolean;
    title?: string;
    size?: string;
    tabletSize?: string;
    mobileSize?: string;
}

export default function Modal({
    source,
    title,
    content,
    closeOnClick,
    size,
    tabletSize,
    mobileSize,
    hideHeader
}: IProps): JSX.Element {
    const [visible, setVisible] = useState(false);
    (Modal as any).setVisible = setVisible;
    const [showContent, setShowContent] = useState(false);
    const closable = closeOnClick !== undefined ? closeOnClick : true;
    const handleClick = useCallback(
        (evt: any) => {
            evt.stopPropagation();
            if (visible && !closable) return;
            setVisible(!visible);
        },
        [visible, closable]
    );

    useEffect(() => {
        setShowContent(visible);
    }, [visible, setShowContent]);

    return (
        <div className="modal-component">
            <div className="modal-component--source" onClick={handleClick}>
                {source}
            </div>
            <If condition={visible}>
                <div
                    className="modal-component--content lock-scroll"
                    onClick={handleClick}
                >
                    <DefaultCard
                        padding="24px"
                        sizes={{
                            default: size,
                            tabletSize: tabletSize,
                            mobileSize: mobileSize
                        }}
                        onClickHandle={(evt: any) => evt.stopPropagation()}
                        title={
                            hideHeader === true ? (
                                <></>
                            ) : (
                                <div className="header-title">
                                    <h4>{title ? title : ''}</h4>
                                    <div
                                        onClick={() => setVisible(false)}
                                        className="btn-close"
                                    />
                                </div>
                            )
                        }
                    >
                        {showContent ? content : <></>}
                    </DefaultCard>
                </div>
            </If>
        </div>
    );
}
