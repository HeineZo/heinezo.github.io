import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ThemeToggle() {
	const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(
		'light'
	);

	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains('dark');
		setThemeState(isDarkMode ? 'dark' : 'light');
	}, []);

	useEffect(() => {
		const isDark =
			theme === 'dark' ||
			(theme === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches);
		document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
	}, [theme]);

	const handleToggle = () => {
		setThemeState((prev) => {
			if (prev === 'light') return 'dark';
			if (prev === 'dark') return 'light';
			return 'system';
		});
	};

	return (
		<Button variant='outline' size='icon' onClick={handleToggle}>
			<Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
			<Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
