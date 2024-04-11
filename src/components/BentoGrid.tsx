import { cn } from '@/lib/utils';

interface Props {
	className?: string;
	children?: React.ReactNode;
}

export const BentoGrid = ({ className, children }: Props) => {
	return (
		<div
			className={cn(
				'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl',
				className
			)}>
			{children}
		</div>
	);
};

export const BentoGridItem = ({
	className,
	title,
	description,
	icon,
	color,
}: {
	className?: string;
	title: string;
	description?: string;
	icon: string;
	color: string;
}) => {
	const colorVariants: { [key: string]: string } = {
		indigo: 'hover:bg-indigo-50 hover:border-indigo-500 dark:hover:bg-indigo-900',
		teal: 'hover:bg-teal-50 hover:border-teal-500 dark:hover:bg-teal-900',
		orange: 'hover:bg-orange-50 hover:border-orange-500 dark:hover:bg-orange-900',
		yellow: 'hover:bg-yellow-50 hover:border-yellow-500 dark:hover:bg-yellow-900',
		rose: 'hover:bg-rose-50 hover:border-rose-500 dark:hover:bg-rose-900',
	};

	const colorTextVariants: { [key: string]: string } = {
		indigo: 'text-indigo-500 dark:text-indigo-400 group-hover:text-indigo-500 group-hover:dark:text-indigo-400',
		teal: 'text-teal-500 dark:text-teal-400 group-hover:text-teal-500 group-hover:dark:text-teal-400',
		orange: 'text-orange-500 dark:text-orange-400 group-hover:text-orange-500 group-hover:dark:text-orange-400',
		yellow: 'text-yellow-500 dark:text-yellow-400 group-hover:text-yellow-500 group-hover:dark:text-yellow-400',
		rose: 'text-rose-500 dark:text-rose-400 group-hover:text-rose-500 group-hover:dark:text-rose-400',
	};

	return (
		<div
			className={cn(
				`row-span-1 rounded-xl group transition duration-200 p-6 bg-card dark:border-foreground/[0.2] border flex flex-col gap-2`,
				colorVariants[color],
				className
			)}>
			<i
				className={cn(
					`mt-auto w-fit text-4xl md:text-neutral-600 md:dark:text-neutral-200 fa-solid ${icon}`,
					colorTextVariants[color]
				)}
			/>
			<div className='space-y-1'>
				<h3 className='text-neutral-600 dark:text-neutral-200'>
					{title}
				</h3>
				<p className='text-neutral-600 line-clamp-6 dark:text-neutral-300 md:max-h-0 md:group-hover:max-h-[500px] transition-all duration-1000'>
					{description}
				</p>
			</div>
		</div>
	);
};
