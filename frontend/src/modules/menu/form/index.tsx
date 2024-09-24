import { RootState } from '@/store';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { ICreateMenuItem } from '../types/menu-item';
import { createMenuItemSchema, CreateMenuItemSchema } from './schema';
import { useMenu } from '../queries/use-menu';

interface MenuFormProps {
	isEditing: boolean;
	hasParent: boolean;
	onSave: (data: ICreateMenuItem) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
	isEditing,
	hasParent,
	onSave,
}) => {
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const selectedMenuId = useSelector(
		(state: RootState) => state.menu.selectedMenuId
	);
	const { menu } = useMenu(selectedMenuId ?? '');
	const initialValues = {
		name: '',
		depth: undefined,
		parentData: '',
	};

	const form = useForm<CreateMenuItemSchema>({
		defaultValues: {
			name: '',
			depth: undefined,
			parentData: '',
		},
		resolver: zodResolver(createMenuItemSchema),
	});

	const onSubmit = (data: CreateMenuItemSchema) => {
		onSave({
			name: data?.name,
			depth: data?.depth,
			parentId: selectedMenuId ?? '',
		});
		form.reset(initialValues);
	};

	useEffect(() => {
		if (hasParent === false) {
			setIsButtonDisabled(false);
			form.reset(initialValues);
		} else if (isEditing || (form?.watch('parentData') as string)?.length > 0) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}, [hasParent, form.watch('parentData'), isEditing]);

	useEffect(() => {
		if (menu) {
			if (isEditing) {
				form.reset({
					name: menu?.name,
					depth: menu?.depth,
					parentData: menu?.parent?.name,
				});
			} else {
				form.reset({
					name: '',
					depth: undefined,
					// TODO: check this
					parentData: menu?.name,
				});
			}
		}
	}, [isEditing, menu, form]);

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
				disabled={isButtonDisabled}
				type='submit'
				className='mt-4 max-w-full w-[263px]'
			>
				Save
			</Button>
		</form>
	);
};

export default MenuForm;
