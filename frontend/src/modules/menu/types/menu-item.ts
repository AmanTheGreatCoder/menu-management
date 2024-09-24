export interface IMenuItem {
	id: string;
	name: string;
	depth: number;
	parentId: string;
	parent: IMenuItem;
	children?: IMenuItem[];
}

export interface ICreateMenuItem {
	name: string;
	depth: number;
	parentId?: string;
}
