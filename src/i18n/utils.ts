import type { Locale } from './config';
import fr from './translations/fr.json';
import en from './translations/en.json';

const translations = {
	fr,
	en,
} as const;

export type TranslationKey = keyof typeof fr;

export function getTranslations(locale: Locale) {
	return translations[locale] || translations.fr;
}

export function t(locale: Locale, key: string): string {
	const keys = key.split('.');
	let value: any = translations[locale] || translations.fr;
	
	for (const k of keys) {
		if (value && typeof value === 'object' && k in value) {
			value = value[k as keyof typeof value];
		} else {
			// Fallback to French if key not found
			value = translations.fr;
			for (const fk of keys) {
				if (value && typeof value === 'object' && fk in value) {
					value = value[fk as keyof typeof value];
				} else {
					return key;
				}
			}
			return typeof value === 'string' ? value : key;
		}
	}
	
	return typeof value === 'string' ? value : key;
}

