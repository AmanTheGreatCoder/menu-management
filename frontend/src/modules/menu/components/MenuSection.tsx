import React from 'react';

interface MenuSectionProps {
	children: React.ReactNode;
}

const MenuSection: React.FC<MenuSectionProps> = ({ children }) => {
	return (
		<div className='flex flex-col mt-2 w-full rounded-2xl'>
			<div className='flex overflow-hidden flex-col py-2 w-full rounded-2xl bg-slate-800'>
				{children}
			</div>
		</div>
	);
};

export default MenuSection;
