import React from 'react';

interface MenuItemProps {
	icon: string;
	text: string;
	active?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, active = false }) => {
	const baseClasses =
		'flex gap-4 items-center p-3 w-full whitespace-nowrap min-h-[48px]';
	const activeClasses = active
		? 'text-gray-900 bg-lime-400 rounded-2xl'
		: 'text-white';

	return (
		<div className={`${baseClasses} ${activeClasses}`}>
			<img
				loading='lazy'
				src={icon}
				alt=''
				className='object-contain shrink-0 self-stretch my-auto w-6 aspect-square'
			/>
			<div className='self-stretch my-auto'>{text}</div>
		</div>
	);
};

export default MenuItem;
