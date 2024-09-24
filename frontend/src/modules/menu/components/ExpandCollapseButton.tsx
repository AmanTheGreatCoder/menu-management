import React from 'react';

interface ExpandCollapseButtonProps {
	text: string;
	expanded: boolean;
	onClick: () => void;
}

export const ExpandCollapseButton: React.FC<ExpandCollapseButtonProps> = ({
	text,
	expanded,
	onClick,
}) => {
	const baseClasses =
		'overflow-hidden gap-2.5 self-stretch px-8 py-3 rounded-[48px] max-md:px-5';
	const expandedClasses = 'bg-slate-800 text-white';
	const collapsedClasses = 'border border-gray-300 border-solid text-slate-600';

	return (
		<button
			className={`flex flex-col ${baseClasses} ${
				expanded ? expandedClasses : collapsedClasses
			}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};
