import { BaseClient } from './BaseClient';

export class CrudClient<
	T extends Record<string, any> = Record<string, any>,
	C extends Record<string, any> = Record<string, any>,
	U extends Record<string, any> = Record<string, any>
> extends BaseClient {
	constructor(endpoint: string) {
		super(endpoint);
	}

	async all() {
		return this.get<T[]>('/');
	}

	async one(id: string) {
		return this.get<T>(`/${id}`);
	}

	async create(data: C) {
		return this.post<T>('/', data);
	}

	async update(id: string, data: U) {
		return this.put<T>(`/${id}`, data);
	}

	async remove(id: string) {
		return this.delete<T>(`/${id}`);
	}
}
