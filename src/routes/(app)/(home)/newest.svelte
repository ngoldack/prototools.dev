<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { SelectTool } from '$lib/schemas/tool.schema';
	import ToolCard from '../search/tool-card.svelte';
	import Autoplay from 'embla-carousel-autoplay';

	export let newest: (SelectTool & { bins: { bin: string }[] })[];
</script>

<div class="flex w-full flex-col items-center justify-center gap-4">
	<span class="text-2xl">Newest tools:</span>

	<Carousel.Root
		opts={{
			align: 'start',
			loop: true
		}}
		plugins={[
			Autoplay({
				delay: 4000
			})
		]}
		class="w-[90%]"
	>
		<Carousel.Content>
			{#each newest as tool, i (i)}
				<Carousel.Item class="md:basis-1/2 lg:basis-1/3">
					<ToolCard {tool} showBins={false} />
				</Carousel.Item>
			{/each}
		</Carousel.Content>
		<Carousel.Previous />
		<Carousel.Next />
	</Carousel.Root>
</div>
