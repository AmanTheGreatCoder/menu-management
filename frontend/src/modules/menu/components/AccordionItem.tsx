'use client';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IAccordionItem } from '../types/accordion';

export const AccordionItem: React.FC<{
	item: IAccordionItem;
	depth: number;
}> = ({ item, depth }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const handleAddClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		// Add your add logic here
		console.log('Add clicked');
	};

	const handleDeleteClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		// Add your delete logic here
		console.log('Delete clicked');
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
					className='flex h-7'
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
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
					{item.children.map((child, index) => (
						<AccordionItem key={index} item={child} depth={depth + 1} />
					))}
				</div>
			)}
		</div>
	);
};
