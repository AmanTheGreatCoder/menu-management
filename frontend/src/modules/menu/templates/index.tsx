'use client';
import { api } from '@/api';
import { IApiError } from '@/api/types';
import { RootState } from '@/store';
import { clearSelectedMenu } from '@/store/slices/menuSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AccordionItem } from '../components/AccordionItem';
import { Dropdown } from '../components/Dropdown';
import { ExpandCollapseButton } from '../components/ExpandCollapseButton';
import { MenuSidebar } from '../components/MenuSidebar';
import MenuForm from '../form';
import { useMenus } from '../queries/use-menus';
import { ICreateMenuItem } from '../types/menu-item';

export const MenuTemplate: React.FC = () => {
	const { menus, isLoading } = useMenus();
	const [isExpanded, setIsExpanded] = useState(false);
	const dispatch = useDispatch();
	const selectedMenuId = useSelector(
		(state: RootState) => state.menu.selectedMenuId
	);
	const [newItemAdded, setNewItemAdded] = useState<string | null>(null);

	const [isEditing, setIsEditing] = useState(false);
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data: ICreateMenuItem) =>
			isEditing
				? api.menu.update(selectedMenuId ?? '', { name: data.name })
				: api.menu.create(data),
		onSuccess: (response) => {
			toast.success(
				isEditing ? 'Menu updated successfully' : 'Menu added successfully'
			);

			if (!isEditing && response?.data?.data?.parentId) {
				setNewItemAdded(response?.data?.data?.parentId);
			}

			queryClient.invalidateQueries({ queryKey: ['menus'] });

			dispatch(clearSelectedMenu());
			setIsEditing(false);
		},
		onError: (error: IApiError) => {
			toast.error(error?.message);
		},
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<section className='flex w-full '>
			<MenuSidebar />
			<div className='flex flex-col items-start mt-14 w-full '>
				<h1 className='flex text-2xl font-bold  gap-4 items-center'>
					<Image
						width={52}
						height={52}
						src={'/assets/icons/menu-icon.svg'}
						alt={'Menu icon'}
						className='object-contain shrink-0 self-stretch my-auto aspect-square w-[52px]'
					/>
					Menus
				</h1>

				<div className='my-7'>
					<h2 className='text-sm font-normal mb-2'>Menu</h2>
					<Dropdown />
				</div>

				<div className='flex justify-between w-full gap-4 mb-4'>
					<div className='w-full'>
						<div className='flex gap-2 mb-4 items-start self-stretch text-sm font-bold tracking-tight leading-none text-center'>
							<ExpandCollapseButton
								onClick={() => setIsExpanded(true)}
								text='Expand All'
								isSelected={isExpanded === true}
							/>
							<ExpandCollapseButton
								onClick={() => setIsExpanded(false)}
								text='Collapse All'
								isSelected={isExpanded === false}
							/>
						</div>

						{menus?.map((item) => (
							<AccordionItem
								expand={isExpanded}
								key={item.id}
								item={item}
								depth={0}
								isEditing={isEditing}
								setIsEditing={setIsEditing}
								newItemAdded={newItemAdded}
								onExpanded={() => setNewItemAdded(null)}
							/>
						))}
					</div>

					<div className='bg-white rounded-lg w-full '>
						<MenuForm
							isEditing={isEditing}
							onSave={(data) => mutation.mutate(data)}
							hasParent={menus && menus?.length > 0 ? true : false}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
