<script>
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<span class="text-5xl font-bold"> Oops. An error occured. </span>

	<p class="mt-4">
		{#if $page.error}
			{$page.error.message}
		{:else}
			An unexpected error occurred. Please try again later.
		{/if}
	</p>

	<Button href="/" class="mt-4">Go back home</Button>
</div>
