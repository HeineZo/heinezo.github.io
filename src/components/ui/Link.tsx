import React from 'react';

export interface LinkProps {
	href: string;
	children: React.ReactNode;
}

export function Link({ href, children, ...props }: LinkProps) {
	return <a href={href} target='_blank' {...props} className='underline-offset-4 decoration-3 decoration-wavy underline decoration-orange-300 hover:decoration-orange-500'>{children}</a>;
};
