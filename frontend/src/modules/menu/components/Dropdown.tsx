import React from 'react';
import Select from 'react-select';

const options = [{ value: 'system management', label: 'System Management' }];

export const Dropdown = () => {
	return (
		<Select
			options={options}
			styles={{
				control: (provided: any) => ({
					...provided,
					backgroundColor: 'white',
					borderColor: '#e2e8f0',
					borderRadius: '0.375rem',
					padding: '2px',
					boxShadow: 'none',
					'&:hover': {
						borderColor: '#cbd5e0',
					},
				}),
				singleValue: (provided: React.CSSProperties) => ({
					...provided,
					color: '#4a5568',
				}),
				dropdownIndicator: (provided: React.CSSProperties) => ({
					...provided,
					color: '#a0aec0',
				}),
				option: (
					provided: React.CSSProperties,
					state: { isFocused: boolean }
				) => ({
					...provided,
					backgroundColor: state.isFocused ? '#f7fafc' : 'white',
					color: '#4a5568',
					'&:hover': {
						backgroundColor: '#f7fafc',
					},
				}),
			}}
			defaultValue={options[0]}
			isSearchable={false}
		/>
	);
};
