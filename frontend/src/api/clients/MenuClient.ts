import { IMenuItem } from '@/modules/menu/types/menu-item';
import { CrudClient } from './templates/CrudClient';

export class MenuClient extends CrudClient<IMenuItem> {
	constructor() {
		super('menu');
	}

	// async loginWithEmail(data: SigninEmailFormSchema) {
	//   return await this.post('/login/email', data);
	// }
}
