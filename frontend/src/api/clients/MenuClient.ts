import { IMenuItem } from '@/modules/menu/types/menu';
import { CrudClient } from './templates/CrudClient';

export class MenuClient extends CrudClient<IMenuItem> {
	constructor() {
		super('menu');
	}
}
