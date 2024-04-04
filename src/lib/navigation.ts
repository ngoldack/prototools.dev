import { Home, Search, User, Cog } from 'lucide-svelte'
import type { SvelteComponent } from 'svelte'

export type Route = {
    name: string
    href: string
    icon?: typeof SvelteComponent

    hidden: boolean
    authenticated?: boolean
}

export const navigation: Route[] = [
    // @ts-ignore
    { name: "Home", href: "/", icon: Home },
    // @ts-ignore
    { name: "Search", href: "/search", icon: Search },

    // Authenticated routes
    // @ts-ignore
    { name: 'My Tools', href: "/profile/tools", authenticated: true, icon: Home },
    // @ts-ignore
    { name: "Profile", href: "/profile", authenticated: true, icon: User, hidden: true},
    // @ts-ignore
    { name: "Settings", href: "/settings", authenticated: true, icon: Cog, hidden: true },
]
