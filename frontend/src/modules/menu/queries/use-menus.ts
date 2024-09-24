import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useMenus = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['menus'],
		queryFn: () => api.menu.all(),
	});

	return {
		menus: data?.data?.data,
		isLoading,
	};
};
