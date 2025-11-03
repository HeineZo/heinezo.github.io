/**
 * Détection côté client de la langue basée sur la géolocalisation
 * Utilise l'API de géolocalisation du navigateur si disponible
 */
export async function detectUserLocale(): Promise<'fr' | 'en'> {
	// Vérifier si une langue est déjà sauvegardée
	if (typeof localStorage !== 'undefined') {
		const savedLocale = localStorage.getItem('preferred-locale');
		if (savedLocale === 'fr' || savedLocale === 'en') {
			return savedLocale;
		}
	}

	// Détection via la langue du navigateur
	const browserLang = navigator.language || (navigator as any).userLanguage;
	if (browserLang && browserLang.toLowerCase().startsWith('en')) {
		return 'en';
	}
    
	try {
		const response = await fetch('https://ipapi.co/json/');
		const data = await response.json();
		
		if (data.country_code) {
			// Liste des pays anglophones (codes ISO 3166-1 alpha-2)
			const englishSpeakingCountries = [
				'US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'SG', 'MY', 'PH', 
				'IN', 'PK', 'BD', 'LK', 'NG', 'KE', 'GH', 'ZW', 'ZM', 'MW', 
				'UG', 'TZ', 'RW', 'JM', 'TT', 'BB', 'GD', 'BS', 'AG', 'LC', 
				'VC', 'KN', 'DM', 'BZ', 'GY', 'SR', 'FJ', 'PG', 'SB', 'VU', 
				'NR', 'PW', 'MH', 'FM', 'WS', 'TO', 'KI', 'TV', 'NA', 'BW', 
				'LS', 'SZ', 'MZ'
			];
			
			if (englishSpeakingCountries.includes(data.country_code)) {
				return 'en';
			}
		}
	} catch (error) {
		console.debug('Geolocation detection failed:', error);
	}

	return 'fr';
}

export function savePreferredLocale(locale: 'fr' | 'en'): void {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('preferred-locale', locale);
	}
}

