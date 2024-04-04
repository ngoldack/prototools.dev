<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';

	import SearchMenu from '$lib/components/search-menu.svelte';
	import { Toaster } from 'svelte-sonner';
	import { navigation } from '$lib/navigation';
	import { Github } from 'lucide-svelte';

	export let data;
</script>

<Toaster />

<ModeWatcher />

<div class="flex min-h-screen w-full flex-col">
	<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a href="/" class="flex items-center gap-2 break-keep text-lg font-semibold md:text-base">
				<Package2 class="h-6 w-6" />
				<span class="sr-only">prototools.dev</span>
			</a>
			{#each navigation as nav}
				{#if !nav.hidden && (!nav.authenticated || data.user)}
					<a href={nav.href} class="text-muted-foreground transition-colors hover:text-foreground">
						{nav.name}
					</a>
				{/if}
			{/each}
		</nav>
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="/" class="flex items-center gap-2 text-lg font-semibold">
						<Package2 class="h-6 w-6" />
						<span class="sr-only">prototools.dev</span>
					</a>
					{#each navigation as nav}
						{#if !nav.hidden && (!nav.authenticated || data.user)}
							<a href={nav.href} class="text-muted-foreground hover:text-foreground">
								{nav.name}
							</a>
						{/if}
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<form class="ml-auto flex-1 sm:flex-initial">
				<SearchMenu user={data.user} />
			</form>

			{#if data.user}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger asChild let:builder>
						<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
							<CircleUser class="h-5 w-5" />
							<span class="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Label>My Account</DropdownMenu.Label>
						<span class="text-sm text-muted-foreground">@{data.user.id}</span>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Settings</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item on:click={() => toggleMode()}>Theme</DropdownMenu.Item>
						<DropdownMenu.Separator />
						<DropdownMenu.Item href="/auth/logout">Logout</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{:else}
				<Button href="/auth/login/github" variant="secondary" class="rounded-full">
					<span>Login with GitHub</span>
				</Button>
			{/if}
		</div>
	</header>
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
		<slot />
	</main>
	<footer>
		<div
			class="border-t border-muted-foreground bg-background p-4 text-center text-muted-foreground"
		>
			<p>
				© {new Date().getFullYear()} <a href="https://ngoldack.de">@ngoldack</a>
				| Built with
				<a
					href="https://kit.svelte.dev"
					class="text-muted-foreground transition-colors hover:text-foreground"
				>
					SvelteKit
				</a>
				|
				<a
					href="https://github.com/ngoldack/prototools.dev"
					class="text-muted-foreground transition-colors hover:text-foreground"
				>
					<Github class="inline-block h-3 w-3" />
					Source
				</a>
			</p>
		</div>
	</footer>
</div>
