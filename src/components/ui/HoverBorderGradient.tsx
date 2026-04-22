'use client';
import { useEffect, useState, type ElementType, type HTMLAttributes, type PropsWithChildren } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type Direction = 'TOP' | 'LEFT' | 'BOTTOM' | 'RIGHT';

interface HoverBorderGradientOwnProps {
	as?: ElementType;
	containerClassName?: string;
	className?: string;
	duration?: number;
	clockwise?: boolean;
}

interface HoverBorderGradientProps
	extends HoverBorderGradientOwnProps,
		HTMLAttributes<HTMLElement> {}

const DIRECTIONS: Direction[] = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];

const MOVING_MAP: Record<Direction, string> = {
	TOP: 'radial-gradient(20.7% 50% at 50% 0%, hsl(var(--foreground) / 1) 0%, hsl(var(--foreground) / 0) 100%)',
	LEFT: 'radial-gradient(16.6% 43.1% at 0% 50%, hsl(var(--foreground) / 1) 0%, hsl(var(--foreground) / 0) 100%)',
	BOTTOM: 'radial-gradient(20.7% 50% at 50% 100%, hsl(var(--foreground) / 1) 0%, hsl(var(--foreground) / 0) 100%)',
	RIGHT: 'radial-gradient(16.2% 41.2% at 100% 50%, hsl(var(--foreground) / 1) 0%, hsl(var(--foreground) / 0) 100%)',
};

const HIGHLIGHT =
	'radial-gradient(75% 181.15942028985506% at 50% 50%, hsl(var(--foreground) / 1) 0%, hsl(var(--foreground) / 0) 100%)';

export function HoverBorderGradient({
	children,
	containerClassName,
	className,
	as: Tag = 'button',
	duration = 1,
	clockwise = true,
	...props
}: PropsWithChildren<HoverBorderGradientProps>) {
	const [hovered, setHovered] = useState(false);
	const [direction, setDirection] = useState<Direction>('TOP');

	const rotateDirection = (currentDirection: Direction): Direction => {
		const currentIndex = DIRECTIONS.indexOf(currentDirection);
		const nextIndex = clockwise
			? (currentIndex - 1 + DIRECTIONS.length) % DIRECTIONS.length
			: (currentIndex + 1) % DIRECTIONS.length;
		return DIRECTIONS[nextIndex];
	};

	useEffect(() => {
		if (hovered) return;
		const interval = setInterval(() => {
			setDirection((prev) => rotateDirection(prev));
		}, duration * 1000);
		return () => clearInterval(interval);
	}, [hovered, duration, clockwise]);

	return (
		<Tag
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={cn(
				'cursor-default relative flex rounded-full content-center bg-foreground/5 hover:bg-foreground/10 transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit',
				containerClassName,
			)}
			{...props}
		>
			<div
				className={cn(
					'w-auto z-10 bg-background text-foreground px-4 py-2 rounded-[inherit]',
					className,
				)}
			>
				{children}
			</div>
			<motion.div
				className={cn('flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]')}
				style={{ filter: 'blur(2px)', position: 'absolute', width: '100%', height: '100%' }}
				initial={{ background: MOVING_MAP[direction] }}
				animate={{
					background: hovered ? [MOVING_MAP[direction], HIGHLIGHT] : MOVING_MAP[direction],
				}}
				transition={{ ease: 'linear', duration }}
			/>
			<div className='bg-background absolute z-[1] flex-none inset-[2px] rounded-[100px]' />
		</Tag>
	);
}
