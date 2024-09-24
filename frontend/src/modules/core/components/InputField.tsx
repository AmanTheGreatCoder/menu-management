import React from 'react';

interface InputFieldProps {
	label: string;
	value: React.InputHTMLAttributes<HTMLInputElement>['value'];
	readOnly?: boolean;
	className?: string;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	value,
	readOnly = false,
	className = '',
	inputProps,
	errorMessage,
}) => {
	const { type, ...otherInputProps } = inputProps || {};
	return (
		<div className={`flex flex-col leading-none ${className}`}>
			<label className='gap-1 self-start text-sm tracking-tight text-slate-600'>
				{label}
			</label>
			<input
				type={type || 'text'}
				value={value}
				readOnly={readOnly}
				disabled={readOnly}
				className={` ${
					readOnly
						? 'bg-[#F9FAFB] cursor-not-allowed'
						: 'cursor-text bg-[#EAECF0]'
				} flex-1 shrink gap-4 self-stretch px-4 py-3.5 mt-2 w-full text-base tracking-tight text-gray-500 whitespace-nowrap focus:outline-none rounded-2xl min-h-[52px] max-md:max-w-full`}
				{...otherInputProps}
			/>
			{errorMessage && (
				<span className='text-red-500 mt-2'>{errorMessage}</span>
			)}
		</div>
	);
};

export default InputField;
