'use client';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { IMenuItem } from '../types/menu';
import CustomModal from '../../core/components/CustomModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { toast } from 'react-toastify';
import { IApiError } from '@/api/types';
import { clearSelectedMenu, selectMenu } from '@/store/slices/menuSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';

interface IAccordionItemProps {
	item: IMenuItem;
	depth: number;
	newItemAdded: string | null;
	onExpanded: () => void;
	expand: boolean;
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
}

export const AccordionItem: React.FC<IAccordionItemProps> = ({
	item,
	depth,
	expand,
	setIsEditing,
	isEditing,
	newItemAdded,
	onExpanded,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isHovered, setIsHovered] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const selectedMenuId = useSelector(
		(state: RootState) => state.menu.selectedMenuId
	);

	const handleAddClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsEditing(false);
		dispatch(selectMenu(item.id));
	};

	const mutation = useMutation({
		mutationFn: () => api.menu.remove(item.id),
		onSuccess: () => {
			toast.success('Menu deleted successfully');
			queryClient.invalidateQueries({ queryKey: ['menus'] });
			dispatch(clearSelectedMenu());
			setIsEditing(false);
		},
		onError: (error: IApiError) => {
			toast.error(error?.message);
		},
	});

	const handleDeleteClick = (event: React.MouseEvent) => {
		event.stopPropagation();
		setIsModalOpen(true);
	};

	const confirmDelete = () => {
		mutation.mutate();
	};

	const handleToggle = () => {
		console.log('toglle clicked', isOpen);
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		setIsOpen(expand);
	}, [expand]);

	useEffect(() => {
		if (newItemAdded === item.id && !isOpen) {
			setIsOpen(true);
			onExpanded();
		}
	}, [newItemAdded, item.id, isOpen, onExpanded]);

	console.log('isOpen', isOpen);

	return (
		<div className={`relative ml-${depth * 4}`}>
			{depth > 0 && (
				<div className='absolute left-[-16px] top-0 bottom-0 border-l border-gray-300' />
			)}
			<div
				className='flex items-center justify-start cursor-pointer py-2 relative'
				onClick={handleToggle}
			>
				{depth > 0 && (
					<div className='absolute left-[-16px] top-1/2 w-4 border-t border-gray-300' />
				)}
				{item?.children?.length && item?.children?.length > 0 ? (
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
						isEditing && selectedMenuId === item.id ? 'font-semibold' : ''
					}`}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					onClick={() => {
						console.log('setting is editing true');
						setIsEditing(true);
						dispatch(selectMenu(item.id));
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
			{isOpen && item?.children && item?.children?.length > 0 && (
				<div className='ml-4'>
					{item?.children?.map((child, index) => (
						<AccordionItem
							expand={expand}
							key={index}
							item={child}
							isEditing={isEditing}
							depth={depth + 1}
							newItemAdded={newItemAdded}
							onExpanded={onExpanded}
							setIsEditing={setIsEditing}
						/>
					))}
				</div>
			)}

			<CustomModal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				onConfirm={confirmDelete}
				contentLabel='Confirm'
			>
				<p>
					Are you sure you want to delete this Menu <strong>{item.name}</strong>
					?
				</p>
			</CustomModal>
		</div>
	);
};
