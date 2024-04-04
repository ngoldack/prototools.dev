<script lang="ts">
	import Search from '../search/search.svelte';
	import Newest from './newest.svelte';

	export let data;
</script>

<div class="flex flex-col items-center justify-center">
	<span class="text-5xl font-bold"> prototools.dev </span>
	<span class="text-muted-foreground">
		Unofficial
		<a href="https://moonrepo.dev/proto" class="text-foreground">proto</a>
		plugin index
	</span>
</div>

<Search />

<div class="flex justify-center">
	<Newest newest={data.newest} />
</div>
