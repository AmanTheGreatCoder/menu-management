import { CrudClient } from './templates/CrudClient';

export class MenuClient extends CrudClient {
	constructor() {
		super('menu');
	}

	// async loginWithEmail(data: SigninEmailFormSchema) {
	//   return await this.post('/login/email', data);
	// }
}
