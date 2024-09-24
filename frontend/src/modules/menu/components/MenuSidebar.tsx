'use client';
import Image from 'next/image';
import React from 'react';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';

const menuItems = [
	{
		icon: '/assets/icons/systems.svg',
		text: 'Systems',
		active: false,
	},
	{
		icon: '/assets/icons/system-code.svg',
		text: 'System Code',
		active: false,
	},
	{
		icon: '/assets/icons/properties.svg',
		text: 'Properties',
		active: false,
	},
	{
		icon: '/assets/icons/menus.svg',
		text: 'Menus',
		active: true,
	},
	{
		icon: '/assets/icons/properties.svg',
		text: 'API List',
		active: false,
	},
];

const additionalSections = [
	{
		icon: '/assets/icons/users-group.svg',
		text: 'Users & Group',
	},
	{
		icon: '/assets/icons/users-group.svg',
		text: 'Competition',
	},
];

export const MenuSidebar: React.FC = () => {
	return (
		<div
			className={`flex overflow-hidden h-[95vh] flex-col pb-1.5 m-6 w-full max-w-60 bg-gray-900 rounded-3xl max-md:mt-6 transition-all duration-300 ${'w-60'}`}
		>
			<header className='flex gap-10 justify-between items-center px-8 py-8 max-md:px-5'>
				<Image
					src='/assets/icons/logo.svg'
					alt='Company logo'
					width={70}
					height={22}
					className={`object-contain shrink-0 self-stretch my-auto aspect-[3.33] ${'w-[70px]'} transition-all duration-300`}
				/>

				<Image
					src='/assets/icons/menu-close.svg'
					alt='Menu icon'
					width={24}
					height={24}
					className='object-contain self-stretch my-auto w-6 aspect-square'
				/>
			</header>
			<main
				className={`flex flex-col px-4 pt-2.5 text-sm font-bold tracking-tight leading-none text-gray-500 min-h-[942px] pb-[564px] max-md:pb-24 transition-all duration-300 opacity-100`}
			>
				<nav className='flex flex-col w-52 max-w-full'>
					<MenuSection>
						{menuItems.map((item, index) => (
							<MenuItem
								key={index}
								icon={item.icon}
								text={item.text}
								active={item.active}
							/>
						))}
					</MenuSection>
					{additionalSections.map((section, index) => (
						<MenuSection key={index}>
							<MenuItem icon={section.icon} text={section.text} />
						</MenuSection>
					))}
				</nav>
			</main>
		</div>
	);
};
