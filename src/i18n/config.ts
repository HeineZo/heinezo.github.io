export const locales = {
	fr: 'Français',
	en: 'English',
} as const;

export type Locale = keyof typeof locales;

export const defaultLocale: Locale = 'fr';

// Liste des pays anglophones (codes ISO 3166-1 alpha-2)
export const englishSpeakingCountries = [
	'US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'SG', 'MY', 'PH', 'IN', 'PK', 'BD', 'LK', 'NG', 'KE', 'GH', 'ZW', 'ZM', 'MW', 'UG', 'TZ', 'RW', 'JM', 'TT', 'BB', 'GD', 'BS', 'AG', 'LC', 'VC', 'KN', 'DM', 'BZ', 'GY', 'SR', 'FJ', 'PG', 'SB', 'VU', 'NR', 'PW', 'MH', 'FM', 'WS', 'TO', 'KI', 'TV', 'NA', 'BW', 'LS', 'SZ', 'MZ'
];

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

