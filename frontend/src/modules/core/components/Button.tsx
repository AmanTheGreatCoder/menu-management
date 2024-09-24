import React from 'react';

interface ButtonProps {
	onClick?: () => void;
	className?: string;
	children: React.ReactNode;
	type?: 'button' | 'submit';
	disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	className = '',
	type = 'button',
	disabled = false,
	children,
}) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`flex flex-col max-w-full text-sm font-bold tracking-tight leading-none text-center text-white whitespace-nowrap ${className}`}
			type={type}
		>
			<div
				className={`overflow-hidden gap-2.5 self-stretch px-8 py-5 w-full  min-h-[52px] rounded-[48px] max-md:px-5 ${
					disabled ? 'bg-gray-400' : 'bg-blue-700'
				}  `}
			>
				{children}
			</div>
		</button>
	);
};

export default Button;
