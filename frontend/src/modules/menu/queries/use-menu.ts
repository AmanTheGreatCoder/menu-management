import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useMenu = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['menu', id],
		queryFn: () => api.menu.one(id),
		enabled: !!id,
	});

	return {
		menu: data?.data?.data,
		isLoading,
	};
};
