'use client';
import {
	ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import './_styles.scss';
import DefaultCard from '@/components/cards/default';
import If from '@/components/common/if';

interface IProps {
	source: ReactNode;
	content: ReactNode;
	footer?: ReactNode;
	modalVisible?: boolean;
	closeOnClick?: boolean;
	hideHeader?: boolean;
	title?: string;
	size?: string;
	type?: string;
	setModalVisible?: any;
	closeAction?: any;
	header?: ReactNode;
	footerSlot?: ReactNode;
	dropdown?: boolean;
}

export default function Modal({
	source,
	title,
	content,
	closeOnClick,
	size,
	hideHeader,
	type,
	modalVisible,
	setModalVisible,
	footer,
	header,
	dropdown,
	closeAction,
}: IProps): ReactNode {
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
		[visible, closable],
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
				right: `${right}px`,
			};
		} else {
			return {
				top: `${top}px`,
				left: `${left}px`,
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
				<div
					onClick={() => (closeAction ? closeAction() : setVisible(false))}
					className="btn-close"
				/>
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
						}}
						style={isDropdown ? dropDownStyle : {}}
						onClickHandle={(evt: any) => evt.stopPropagation()}
						footer={footer && <div className="modal-footer">{footer}</div>}
						title={<HeaderContent />}
					>
						{showContent && content}
					</DefaultCard>
				</div>
			</If>
		</div>
	);
}
