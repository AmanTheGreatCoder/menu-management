'use client';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import Modal from 'react-modal';
import { IMenuItem } from '../types/menu-item';

Modal.setAppElement('#__next');

interface IAccordionItemProps {
	item: IMenuItem;
	depth: number;
	expand: boolean;
	isEditing: boolean;
	selectedMenu: IMenuItem | null;
	setIsEditing: (isEditing: boolean) => void;
	setSelectedMenu: (menu: IMenuItem) => void;
}

export const AccordionItem: React.FC<IAccordionItemProps> = ({
	item,
	depth,
	expand,
	setSelectedMenu,
	setIsEditing,
	isEditing,
	selectedMenu,
}) => {
	const [isOpen, setIsOpen] = useState(expand);
	const [isHovered, setIsHovered] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(true);

	console.log('item in accordion', item);

	const handleAddClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		console.log('Add clicked', item);
		setSelectedMenu({ ...item, depth: depth });
	};

	const handleDeleteClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsModalOpen(true);
		console.log('Delete clicked');
	};

	const confirmDelete = () => {
		setIsModalOpen(false);
		console.log('Confirmed delete');
	};

	return (
		<div className={`relative ml-${depth * 4}`}>
			{depth > 0 && (
				<div className='absolute left-[-16px] top-0 bottom-0 border-l border-gray-300' />
			)}
			<div
				className='flex items-center justify-start cursor-pointer py-2 relative'
				onClick={() => setIsOpen(!isOpen)}
			>
				{depth > 0 && (
					<div className='absolute left-[-16px] top-1/2 w-4 border-t border-gray-300' />
				)}
				{item.children ? (
					<ChevronDownIcon
						className={`w-4 h-4 mr-2 transition-transform ${
							isOpen ? 'transform rotate-180' : ''
						}`}
					/>
				) : (
					<span className='w-4 h-4 mr-2' />
				)}
				<span
					className={`flex h-7 ${
						isEditing && selectedMenu?.id === item.id ? 'font-semibold' : ''
					}`}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={() => {
						setIsEditing(true);
						setSelectedMenu({ ...item, depth: depth });
					}}
				>
					{item.name}
					{isHovered && (
						<div className='flex ml-2 space-x-2'>
							<img
								className='w-7 h-7 cursor-pointer'
								src='/assets/icons/add.svg'
								alt='Add'
								onClick={handleAddClick}
							/>
							<img
								className='w-7 h-7 cursor-pointer'
								src='/assets/icons/delete.svg'
								alt='Delete'
								onClick={handleDeleteClick}
							/>
						</div>
					)}
				</span>
			</div>
			{isOpen && item.children && (
				<div className='ml-4'>
					{item?.children?.map((child, index) => (
						<AccordionItem
							expand={expand}
							key={index}
							item={child}
							isEditing={isEditing}
							selectedMenu={selectedMenu}
							depth={depth + 1}
							setIsEditing={setIsEditing}
							setSelectedMenu={setSelectedMenu}
						/>
					))}
				</div>
			)}

			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				contentLabel='Confirm Delete'
				className='modal'
				overlayClassName='overlay'
				ariaHideApp={false}
				style={{
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						transform: 'translate(-50%, -50%)',
					},
				}}
			>
				<div className='modal-content'>
					<img
						src='/assets/icons/warning.svg'
						alt='Warning'
						className='modal-icon'
					/>
					<h2>
						Are you sure you want to delete this Menu{' '}
						<strong>{item.name}</strong>?
					</h2>
					<div className='modal-buttons'>
						<button onClick={confirmDelete} className='modal-button delete'>
							Delete
						</button>
						<button
							onClick={() => setIsModalOpen(false)}
							className='modal-button cancel'
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
};
