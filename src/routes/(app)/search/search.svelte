<script lang="ts">
	import {
		pluginSources,
		pluginTypes,
		type PluginSource,
		type PluginType
	} from '$lib/schemas/tool.schema';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { goto, invalidateAll } from '$app/navigation';
	import { page, navigating } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Filter, Search } from 'lucide-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { onMount } from 'svelte';

	import { setupViewTransition } from 'sveltekit-view-transition';
	const { transition } = setupViewTransition();

	let filterSource: PluginSource | '' = '';
	let filterType: PluginType | '' = '';

	let query: string = '';

	const submit = async (e: SubmitEvent) => {
		e.preventDefault();
		const params = $page.url.searchParams;
		params.set('q', query);
		if (filterSource) params.set('source', filterSource);
		else params.delete('source');
		if (filterType) params.set('type', filterType);
		else params.delete('type');
		await goto(`/search?${params.toString()}`);
		await invalidateAll();
	};

	onMount(() => {
		const params = $page.url.searchParams;
		query = params.get('q') || '';
		filterSource = (params.get('source') as PluginSource) || '';
		filterType = (params.get('type') as PluginType) || '';
	});

	const resetFilter = () => {
		filterSource = '';
		filterType = '';
	};

	$: activeFilterCount = [filterSource !== '', filterType !== ''].filter(Boolean).length;
</script>

<form
	method="POST"
	class="flex items-center justify-center gap-2"
	on:submit|preventDefault={submit}
	use:transition={{
		name: 'search'
	}}
>
	<Search class="h-6 w-6" />
	<Input type="search" name="query" bind:value={query} />
	<Button type="submit" disabled={!!$navigating}>Search</Button>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]} class="gap-1">
				{#if activeFilterCount > 0}
					<Badge>
						{activeFilterCount}
					</Badge>
				{/if}
				<Filter class="h-4 w-4" />
				Filter
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-56">
			<DropdownMenu.Label>Plugin Type</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.RadioGroup bind:value={filterType}>
				<DropdownMenu.RadioItem value="">All types</DropdownMenu.RadioItem>
				{#each pluginTypes as type}
					<DropdownMenu.RadioItem value={type}>{type}</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
			<DropdownMenu.Separator />
			<DropdownMenu.Label>Plugin Source</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.RadioGroup bind:value={filterSource}>
				<DropdownMenu.RadioItem value="">All sources</DropdownMenu.RadioItem>
				{#each pluginSources as source}
					<DropdownMenu.RadioItem value={source}>{source}</DropdownMenu.RadioItem>
				{/each}
			</DropdownMenu.RadioGroup>
			<DropdownMenu.Separator />
			<Button type="button" variant="secondary" class="w-full" on:click={resetFilter}>Reset</Button>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</form>
