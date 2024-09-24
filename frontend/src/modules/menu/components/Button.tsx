import React from 'react';

interface ButtonProps {
	onClick: () => void;
	className?: string;
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	className = '',
	children,
}) => {
	return (
		<button
			onClick={onClick}
			className={`flex flex-col max-w-full text-sm font-bold tracking-tight leading-none text-center text-white whitespace-nowrap ${className}`}
		>
			<div className='overflow-hidden gap-2.5 self-stretch px-8 py-5 w-full bg-blue-700 min-h-[52px] rounded-[48px] max-md:px-5'>
				{children}
			</div>
		</button>
	);
};

export default Button;
