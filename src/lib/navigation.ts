import { Home, Search, User, Cog } from 'lucide-svelte';
import type { SvelteComponent } from 'svelte';

export type Route = {
	name: string;
	href: string;
	icon?: typeof SvelteComponent;

	hidden: boolean;
	authenticated?: boolean;
};

export const navigation: Route[] = [
	// @ts-expect-error - Home icon is not a valid Svelte component
	{ name: 'Home', href: '/', icon: Home },
	// @ts-expect-error - Home icon is not a valid Svelte component
	{ name: 'Search', href: '/search', icon: Search },

	// Authenticated routes
	// @ts-expect-error - Home icon is not a valid Svelte component
	{ name: 'My Tools', href: '/profile/tools', authenticated: true, icon: Home },
	// @ts-expect-error - Home icon is not a valid Svelte component
	{ name: 'Profile', href: '/profile', authenticated: true, icon: User, hidden: true },
	// @ts-expect-error - Home icon is not a valid Svelte component
	{ name: 'Settings', href: '/settings', authenticated: true, icon: Cog, hidden: true }
];
