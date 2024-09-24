import React from 'react';
import './style.css';

interface CustomModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	onConfirm: () => void;
	contentLabel: string;
	children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
	isOpen,
	onRequestClose,
	onConfirm,
	contentLabel,
	children,
}) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div className='custom-modal-overlay'>
			<div className='custom-modal'>
				<h2>{contentLabel}</h2>
				<div className='custom-modal-content'>{children}</div>
				<div className='custom-modal-buttons'>
					<button onClick={onConfirm} className='custom-modal-button delete'>
						Delete
					</button>
					<button
						onClick={onRequestClose}
						className='custom-modal-button cancel'
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default CustomModal;
