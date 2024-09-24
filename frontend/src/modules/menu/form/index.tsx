import React, { useEffect } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { IMenuItem } from '../types/menu-item';
import { createMenuItemSchema, CreateMenuItemSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface MenuFormProps {
	selectedMenu: IMenuItem | null;
	isEditing: boolean;
	onSave: (data: CreateMenuItemSchema) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
	selectedMenu,
	isEditing,
	onSave,
}) => {
	console.log('form isEditing', isEditing);
	console.log('form selectedMenu', selectedMenu);

	const form = useForm<CreateMenuItemSchema>({
		defaultValues: {
			name: '',
			depth: undefined,
			parentData: '',
		},
		resolver: zodResolver(createMenuItemSchema),
	});

	const onSubmit = (data: CreateMenuItemSchema) => {
		onSave(data);
	};

	useEffect(() => {
		if (isEditing && selectedMenu) {
			form.reset({
				name: selectedMenu.name,
				depth: selectedMenu.depth,
				parentData: selectedMenu.parentData,
			});
		}
	}, [isEditing, selectedMenu, form]);

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='flex flex-col w-full items-start self-start max-md:max-w-full'
		>
			<InputField
				label='Menu ID'
				value={form.watch('id') ?? ''}
				readOnly
				className='self-stretch w-full'
			/>
			<InputField
				label='Depth'
				value={form.watch('depth') ?? ''}
				inputProps={{
					type: 'number',
					onChange: (e) => {
						form.setValue('depth', parseInt(e.target.value));
					},
				}}
				readOnly={isEditing}
				errorMessage={form?.formState?.errors?.depth?.message}
				className='mt-4 max-w-full w-[262px]'
			/>
			<InputField
				label='Parent Data'
				value={form.watch('parentData') ?? ''}
				readOnly
				className='mt-5 max-w-full w-[262px]'
			/>
			<InputField
				label='Name'
				value={form.watch('name') ?? ''}
				inputProps={{
					onChange: (e) => {
						form.setValue('name', e.target.value);
					},
				}}
				errorMessage={form?.formState?.errors?.name?.message}
				className='mt-1.5 max-w-full w-[262px]'
			/>
			<Button
				onClick={() =>
					onSave({
						id: form.getValues('id') ?? undefined,
						name: form.getValues('name'),
						depth: form.getValues('depth'),
						parentData: form.getValues('parentData') ?? undefined,
					})
				}
				className='mt-4 max-w-full w-[263px]'
			>
				Save
			</Button>
		</form>
	);
};

export default MenuForm;
