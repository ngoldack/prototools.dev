<script lang="ts">
	export let data;
	import ToolCard from './tool-card.svelte';
	import { navigating } from '$app/stores';
	import Search from './search.svelte';
</script>

<Search />

<div>
	{#if $navigating}
		<div class="w-full text-center">Loading...</div>
	{:else if data.tools.length > 0}
		<div class="grid grid-flow-row grid-cols-3 gap-2">
			{#each data.tools as tool}
				<ToolCard {tool} />
			{/each}
		</div>
	{:else}
		<div>No tools found</div>
	{/if}
</div>
