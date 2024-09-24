'use client';
import { api } from '@/api';
import { IApiError } from '@/api/types';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import { AccordionItem } from '../components/AccordionItem';
import { Dropdown } from '../components/Dropdown';
import { ExpandCollapseButton } from '../components/ExpandCollapseButton';
import { MenuSidebar } from '../components/MenuSidebar';
import MenuForm from '../form';
import { CreateMenuItemSchema } from '../form/schema';
import { useMenus } from '../queries/use-menus';

// const accordionData: IAccordionItem[] = [
// 	{
// 		id: 'system-management',
// 		name: 'system management',
// 		children: [
// 			{
// 				id: 'system-management',
// 				name: 'System Management',
// 				children: [
// 					{
// 						id: 'systems',
// 						name: 'Systems',
// 						children: [
// 							{
// 								id: 'system-code',
// 								name: 'System Code',
// 								children: [
// 									{
// 										id: 'code-registration',
// 										name: 'Code Registration',
// 									},
// 								],
// 							},
// 							{
// 								id: 'code-registration-2',
// 								name: 'Code Registration - 2',
// 							},
// 							{
// 								id: 'properties',
// 								name: 'Properties',
// 							},
// 							{
// 								id: 'menus',
// 								name: 'Menus',
// 								children: [
// 									{
// 										id: 'menu-registration',
// 										name: 'Menu Registration',
// 									},
// 								],
// 							},
// 							{
// 								id: 'api-list',
// 								name: 'API List',
// 								children: [
// 									{
// 										id: 'api-registration',
// 										name: 'API Registration',
// 									},
// 									{
// 										id: 'api-edit',
// 										name: 'API Edit',
// 									},
// 								],
// 							},
// 						],
// 					},
// 				],
// 			},
// 		],
// 	},
// ];

export const MenuTemplate: React.FC = () => {
	const { menus, isLoading } = useMenus();

	const mutation = useMutation({
		mutationFn: (data: CreateMenuItemSchema) => api.menu.create(data),
		onSuccess: (data) => {
			toast.success('Menu added successfully');
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
								onClick={() => console.log('Expand All')}
								text='Expand All'
								expanded={true}
							/>
							<ExpandCollapseButton
								onClick={() => console.log('Collapse All')}
								text='Collapse All'
								expanded={false}
							/>
						</div>

						{menus?.map((item) => (
							<AccordionItem key={item.id} item={item} depth={0} />
						))}
					</div>

					<div className='bg-white rounded-lg w-full '>
						<MenuForm onSave={(data) => mutation.mutate(data)} />
					</div>
				</div>
			</div>
		</section>
	);
};
