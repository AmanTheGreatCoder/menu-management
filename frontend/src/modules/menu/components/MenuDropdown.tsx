import React from 'react';
import Select, { components, StylesConfig } from 'react-select';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const options = [{ value: 'system management', label: 'System Management' }];

type OptionType = { value: string; label: string };

const DropdownIndicator = (props: any) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronDownIcon className='w-5 h-5 text-gray-400' />
		</components.DropdownIndicator>
	);
};

export const Dropdown = () => {
	return (
		<Select
			options={options}
			components={{ DropdownIndicator }}
			styles={
				{
					control: (provided: any, state: any) => ({
						...provided,
						backgroundColor: 'white',
						borderColor: state.isFocused ? '#e2e8f0' : '#e2e8f0',
						borderRadius: '0.5rem',
						padding: '0.5rem',
						boxShadow: 'none',
						'&:hover': {
							borderColor: '#e2e8f0',
						},
						minHeight: '3rem',
					}),
					singleValue: (provided: React.CSSProperties) => ({
						...provided,
						color: '#1a202c',
						fontSize: '1rem',
						fontWeight: 400,
					}),
					dropdownIndicator: (provided: React.CSSProperties) => ({
						...provided,
						color: '#a0aec0',
						padding: '0 8px',
					}),
					indicatorSeparator: () => ({
						display: 'none',
					}),
					menu: (provided: React.CSSProperties) => ({
						...provided,
						borderRadius: '0.5rem',
						boxShadow:
							'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
					}),
					option: (
						provided: React.CSSProperties,
						state: { isFocused: boolean }
					) => ({
						...provided,
						backgroundColor: state.isFocused ? '#f7fafc' : 'white',
						color: '#1a202c',
						'&:hover': {
							backgroundColor: '#f7fafc',
						},
						padding: '0.75rem 1rem',
					}),
				} as StylesConfig<OptionType, false>
			}
			defaultValue={options[0]}
			isSearchable={false}
		/>
	);
};
