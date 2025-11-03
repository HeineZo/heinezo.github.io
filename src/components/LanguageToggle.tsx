import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";
import { savePreferredLocale } from "@/i18n/client-detection";

interface LanguageToggleProps {
	currentLocale: Locale;
	currentPath: string;
}

export function LanguageToggle({ currentLocale, currentPath }: LanguageToggleProps) {
	const switchLanguage = (newLocale: Locale) => {
		savePreferredLocale(newLocale);
		
		// Définir un cookie pour la préférence (pour les requêtes suivantes)
		document.cookie = `preferred-locale=${newLocale}; path=/; max-age=31536000`; // 1 an
		
		// Remplacer la locale dans le chemin
		const pathWithoutLocale = currentPath.replace(/^\/(fr|en)\//, '/');
		const newPath = pathWithoutLocale === '/' ? `/${newLocale}/` : `/${newLocale}${pathWithoutLocale}`;
		window.location.href = newPath;
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon" aria-label="Change language">
					<Globe className="h-[1.2rem] w-[1.2rem]" />
					<span className="sr-only">Change language</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{Object.entries(locales).map(([locale, label]) => (
					<DropdownMenuItem
						key={locale}
						onClick={() => switchLanguage(locale as Locale)}
						disabled={locale === currentLocale}
					>
						{label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

