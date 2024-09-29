import React from 'react';
import { Button, type ButtonProps } from './Button';

export interface LinkProps extends ButtonProps {
	href: string;
	children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, children, ...props }) => {
	return <a href={href} target='_blank' className='underline-offset-4 decoration-3 decoration-wavy underline decoration-orange-300 hover:decoration-orange-500'>{children}</a>;
};

export { Link };
