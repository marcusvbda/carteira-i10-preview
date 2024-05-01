'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './_styles.scss';
import If from '@/components/common/if';
import DefaultCard from '@/components/cards/default';

interface IProps {
    source: JSX.Element;
    content: JSX.Element;
    footer?: JSX.Element;
    modalVisible?: boolean;
    closeOnClick?: boolean;
    hideHeader?: boolean;
    title?: string;
    size?: string;
    tabletSize?: string;
    mobileSize?: string;
    type?: string;
    setModalVisible?: any;
    header?: JSX.Element;
    footerSlot?: JSX.Element;
    dropdown?: boolean;
}

export default function Modal({
    source,
    title,
    content,
    closeOnClick,
    size,
    tabletSize,
    mobileSize,
    hideHeader,
    type,
    modalVisible,
    setModalVisible,
    footer,
    header,
    dropdown
}: IProps): JSX.Element {
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [right, setRight] = useState(0);
    const refSource = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (modalVisible !== undefined) {
            setVisible(modalVisible);
        }
    }, [modalVisible]);
    useEffect(() => {
        if (setModalVisible !== undefined) {
            setModalVisible(visible);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);
    const [showContent, setShowContent] = useState(false);
    const closable = closeOnClick !== undefined ? closeOnClick : true;
    const isDropdown = useMemo(() => dropdown === true, [dropdown]);

    const handleClick = useCallback(
        (evt: any) => {
            evt.stopPropagation();
            if (visible && !closable) return;
            setVisible(!visible);
        },
        [visible, closable]
    );

    useEffect(() => {
        if (isDropdown) {
            const elSource = refSource.current;
            if (elSource) {
                const screenWith = window.innerWidth;
                const positions = (elSource as any).getBoundingClientRect();
                const { bottom, right, left } = positions;
                setTop(bottom);
                if ((type || '').includes('right')) {
                    setRight(screenWith - right - 13);
                } else {
                    setLeft(left);
                }
            }
        }
    }, [isDropdown, type]);

    const dropDownStyle = useMemo(() => {
        if (!isDropdown) return {};
        if ((type || '').includes('right')) {
            return {
                top: `${top}px`,
                right: `${right}px`
            };
        } else {
            return {
                top: `${top}px`,
                left: `${left}px`
            };
        }
    }, [isDropdown, type, top, right, left]);

    useEffect(() => {
        setShowContent(visible);
    }, [visible, setShowContent]);

    const HeaderContent = () => {
        if (hideHeader) return <></>;
        if (header) return <div className="header-title">{header}</div>;
        return (
            <div className="header-title">
                <h4>{title ? title : ''}</h4>
                <div onClick={() => setVisible(false)} className="btn-close" />
            </div>
        );
    };

    return (
        <div
            className={`modal-component ${type ? type : 'center'} ${
                isDropdown && 'dropdown'
            }`}
        >
            <div
                className="modal-component--source"
                onClick={handleClick}
                ref={refSource}
            >
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
                        style={isDropdown ? dropDownStyle : {}}
                        onClickHandle={(evt: any) => evt.stopPropagation()}
                        footer={
                            footer && (
                                <div className="modal-footer ">{footer}</div>
                            )
                        }
                        title={<HeaderContent />}
                    >
                        {showContent && content}
                    </DefaultCard>
                </div>
            </If>
        </div>
    );
}
