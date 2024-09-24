'use client';
import Toaster from '@/modules/core/components/toaster';
import { store } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, type FC, type ReactNode } from 'react';
import { Provider } from 'react-redux';

interface BaseProviderProps {
	children: ReactNode;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
		},
	},
});

export const BaseProvider: FC<BaseProviderProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Toaster />
				<Suspense>{children}</Suspense>
			</QueryClientProvider>
		</Provider>
	);
};
