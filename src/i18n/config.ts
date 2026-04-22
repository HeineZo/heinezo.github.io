export const locales = {
	fr: 'Français',
	en: 'English',
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'en';

export function getLocaleFromPath(pathname: string): Locale {
	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];
	
	if (firstSegment && firstSegment in locales) {
		return firstSegment as Locale;
	}
	
	return defaultLocale;
}

export function getPathWithoutLocale(pathname: string): string {
	const segments = pathname.split('/').filter(Boolean);
	const firstSegment = segments[0];
	
	if (firstSegment && firstSegment in locales) {
		return '/' + segments.slice(1).join('/');
	}
	
	return pathname;
}
