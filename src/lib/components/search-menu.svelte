<script lang="ts">
	import { onMount } from 'svelte';
	import { resetMode, setMode } from 'mode-watcher';
	import * as Command from '$lib/components/ui/command/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import { goto } from '$app/navigation';
	import { Globe, Sun, Moon, Laptop, LogOut, LogIn, Search } from 'lucide-svelte';
	import { navigation } from '$lib/navigation';
	import type { User } from 'lucia';

	export let user: User | null;
	let open = false;

	onMount(() => {
		function handleKeydown(e: KeyboardEvent) {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = true;
			}
		}
		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	function runCommand(cmd: () => void) {
		open = false;
		cmd();
	}

	let input = '';
</script>

<Button
	variant="outline"
	class={cn('text-muted-foreground relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64')}
	on:click={() => (open = true)}
	{...$$restProps}
>
	<span class="hidden lg:inline-flex"> Search... </span>
	<span class="inline-flex lg:hidden">Search...</span>
	<kbd
		class="bg-muted pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
	>
		<span class="text-xs">⌘</span>K
	</kbd>
</Button>
<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search" bind:value={input} />

	<Command.List>
		<Command.Empty>
			<Button variant="outline" on:click={() => runCommand(() => goto(`/search?q=${input}`))}>
				Search for tool '{input}''
			</Button>
		</Command.Empty>
		<Command.Group heading="Sites">
			{#each navigation as route}
				{#if !route.authenticated || user}
					<Command.Item
						value="{route.name} {route.href}"
						onSelect={() => runCommand(() => goto(route.href))}
					>
						{#if route.icon}
							<svelte:component this={route.icon} class="mr-2 h-4 w-4" />
						{:else}
							<Globe class="mr-2 h-4 w-4" />
						{/if}
						{route.name}
					</Command.Item>
				{/if}
			{/each}
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Authentication">
			{#if user}
				<Command.Item value="logout" onSelect={() => runCommand(() => goto('/auth/logout'))}>
					<LogOut class="mr-2 h-4 w-4" />
					Logout
				</Command.Item>
			{:else}
				<Command.Item
					value="login with github"
					onSelect={() => runCommand(() => goto('/auth/login/github'))}
				>
					<LogIn class="mr-2 h-4 w-4" />
					Login with GitHub
				</Command.Item>
			{/if}
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Theme">
			<Command.Item value="light" onSelect={() => runCommand(() => setMode('light'))}>
				<Sun class="mr-2 h-4 w-4" />
				Light
			</Command.Item>
			<Command.Item value="dark" onSelect={() => runCommand(() => setMode('dark'))}>
				<Moon class="mr-2 h-4 w-4" />
				Dark
			</Command.Item>
			<Command.Item value="system" onSelect={() => runCommand(() => resetMode())}>
				<Laptop class="mr-2 h-4 w-4" />
				System
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
