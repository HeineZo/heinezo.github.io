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

interface LanguageToggleProps {
	currentLocale: Locale;
	currentPath: string;
}

export function LanguageToggle({ currentLocale, currentPath }: LanguageToggleProps) {
	const switchLanguage = (newLocale: Locale) => {
		const pathWithoutLocale = currentPath.replace(/^\/fr(\/|$)/, '/');
		const newPath =
			newLocale === 'fr'
				? pathWithoutLocale === '/'
					? '/fr/'
					: `/fr${pathWithoutLocale}`
				: pathWithoutLocale;
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
