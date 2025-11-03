import { defineMiddleware } from 'astro:middleware';
import { defaultLocale, englishSpeakingCountries } from './i18n/config';

export const onRequest = defineMiddleware(async (context, next) => {
	const { url, request } = context;
	const pathname = new URL(url.pathname, url.origin).pathname;
	
	// Si on est déjà sur une route avec locale, on continue
	if (pathname.startsWith('/fr/') || pathname.startsWith('/en/')) {
		const response = await next();
		// Si la réponse est 404, rediriger vers la page 404 localisée
		if (response.status === 404) {
			const locale = pathname.startsWith('/fr/') ? 'fr' : 'en';
			return new Response(null, {
				status: 302,
				headers: {
					'Location': `/${locale}/404`,
				},
			});
		}
		return response;
	}
	
	// Si c'est la racine, on détecte la langue
	if (pathname === '/' || pathname === '') {
		let locale = defaultLocale;
		
		// 1. Détection via cookie (préférence utilisateur sauvegardée)
		const cookie = request.headers.get('cookie');
		if (cookie) {
			const localeMatch = cookie.match(/preferred-locale=([^;]+)/);
			if (localeMatch && (localeMatch[1] === 'fr' || localeMatch[1] === 'en')) {
				locale = localeMatch[1] as 'fr' | 'en';
				return new Response(null, {
					status: 302,
					headers: {
						'Location': `/${locale}/`,
					},
				});
			}
		}
		
		// 2. Détection via Accept-Language header
		const acceptLanguage = request.headers.get('accept-language');
		if (acceptLanguage) {
			const languages = acceptLanguage.split(',').map(lang => {
				const [code, q = 'q=1'] = lang.trim().split(';');
				const quality = parseFloat(q.replace('q=', ''));
				return { code: code.toLowerCase().substring(0, 2), quality };
			});
			
			// Prioriser l'anglais si accepté avec une qualité > 0.5
			if (languages.some(l => l.code === 'en' && l.quality > 0.5)) {
				locale = 'en';
			}
		}
		
		// 3. Détection via géolocalisation (si disponible via Cloudflare, Vercel, etc.)
		const country = request.headers.get('cf-ipcountry') || // Cloudflare
						request.headers.get('x-vercel-ip-country') || // Vercel
						request.headers.get('x-country-code'); // Autres providers
		
		if (country && englishSpeakingCountries.includes(country.toUpperCase())) {
			locale = 'en';
		}
		
		// Rediriger vers la locale appropriée
		return new Response(null, {
			status: 302,
			headers: {
				'Location': `/${locale}/`,
			},
		});
	}
	
	return next();
});

