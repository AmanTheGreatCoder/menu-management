import { AxiosError } from 'axios';

export interface IApiResponse<
	T extends {
		[key: string]: any;
	}
> {
	success: boolean;
	statusCode: number;
	data: T | null;
	errors: {
		[key: string]: string;
	};
	path: string;
	message: string;
	stackTrace?: string;
}

export type IApiError = AxiosError<IApiResponse<any>>;
