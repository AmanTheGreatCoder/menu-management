export interface IMenuItem {
	id: string;
	name: string;
	depth: number;
	parentData: string;
	children?: IMenuItem[];
}
