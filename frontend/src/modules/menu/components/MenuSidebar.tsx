'use client';
import Image from 'next/image';
import React from 'react';
import MenuItem from './MenuItem';
import MenuSection from './MenuSection';

const menuItems = [
	{
		icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/130f1061d000aba25688e014e97faf63e764496c62dc0b00ef7457d26e31fc69?placeholderIfAbsent=true&apiKey=d39389e2ddda4e698370a42a05bee39d',
		text: 'Systems',
		active: false,
	},
	{
		icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/076274166fc8202140b747ccac09a65d58d821ddfd0db5bd2a83538fe0ef915e?placeholderIfAbsent=true&apiKey=d39389e2ddda4e698370a42a05bee39d',
		text: 'System Code',
		active: false,
	},
	{
		icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccde29c65c3cf6440ce8f4bd3c12f698ad6d3e39f54570d9eb5ffd674c56a138?placeholderIfAbsent=true&apiKey=d39389e2ddda4e698370a42a05bee39d',
		text: 'Properties',
		active: false,
	},
	{
		icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/a0b0c0f678d1d22b64dc9959aaf706a2776923b7ae7a98360d68f0fa0bb9e064?placeholderIfAbsent=true&apiKey=d39389e2ddda4e698370a42a05bee39d',
		text: 'Menus',
		active: true,
	},
	{
		icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccde29c65c3cf6440ce8f4bd3c12f698ad6d3e39f54570d9eb5ffd674c56a138?placeholderIfAbsent=true&apiKey=d39389e2ddda4e698370a42a05bee39d',
		text: 'API List',
		active: false,
	},
];

const additionalSections = [
	{
		icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e0306e8115e1f809792d07163d21d5d2fd27071ac35f6c6b7213f812c2cd3d34?placeholderIfAbsent=true&apiKey=d39389e2ddda4e698370a42a05bee39d',
		text: 'Users & Group',
	},
	{
		icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e0306e8115e1f809792d07163d21d5d2fd27071ac35f6c6b7213f812c2cd3d34?placeholderIfAbsent=true&apiKey=d39389e2ddda4e698370a42a05bee39d',
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
