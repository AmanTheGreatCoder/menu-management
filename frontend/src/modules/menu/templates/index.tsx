'use client';
import { api } from '@/api';
import { IApiError } from '@/api/types';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AccordionItem } from '../components/AccordionItem';
import { Dropdown } from '../components/Dropdown';
import { ExpandCollapseButton } from '../components/ExpandCollapseButton';
import { MenuSidebar } from '../components/MenuSidebar';
import MenuForm from '../form';
import { CreateMenuItemSchema } from '../form/schema';
import { useMenus } from '../queries/use-menus';
import { IMenuItem } from '../types/menu-item';

export const MenuTemplate: React.FC = () => {
	const { menus, isLoading } = useMenus();
	const [isExpanded, setIsExpanded] = useState(false);
	const [selectedMenu, setSelectedMenu] = useState<IMenuItem | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	const mutation = useMutation({
		mutationFn: (data: CreateMenuItemSchema) =>
			isEditing
				? api.menu.update(selectedMenu?.id ?? '', { name: data.name })
				: api.menu.create(data),
		onSuccess: (data) => {
			toast.success(
				isEditing ? 'Menu updated successfully' : 'Menu added successfully'
			);
			setIsEditing(false);

			console.log('data', data);
		},
		onError: (error: IApiError) => {
			toast.error(error?.message);
			// populateError(form, error);
		},
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<section className='flex w-full '>
			<MenuSidebar />
			<div className='flex flex-col items-start mt-14 w-full '>
				<h1 className='flex text-2xl font-bold  gap-4 items-center'>
					<img
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

				<div className='flex justify-between w-full gap-4'>
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
								selectedMenu={selectedMenu}
								setIsEditing={setIsEditing}
								setSelectedMenu={setSelectedMenu}
							/>
						))}
					</div>

					<div className='bg-white rounded-lg w-full '>
						<MenuForm
							selectedMenu={selectedMenu}
							isEditing={isEditing}
							onSave={(data) => mutation.mutate(data)}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
