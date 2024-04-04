<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Clipboard, GitBranch, Globe } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Badge } from '$lib/components/ui/badge';
	import type { SelectTool } from '$lib/schemas/tool.schema';
	import { Highlight } from 'svelte-highlight';
	import { shell } from 'svelte-highlight/languages';
	import { toast } from 'svelte-sonner';

	function installCode(tool: SelectTool): string {
		let prefix: string = '';
		if (tool.source === 'third-party') {
			prefix = `proto plugin add ${tool.usageId} "${tool.locator}"\n`;
		}

		return `${prefix}proto plugin install ${tool.usageId}`;
	}

	function copyInstallCode() {
		const code = installCode(tool);
		navigator.clipboard.writeText(code.replace(/\n/g, '\r\n'));
		toast.success('Copied to clipboard');
	}

	export let tool: { bins?: { bin: string }[] } & SelectTool;
	export let showBins: boolean = true;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="items-center">
			{tool.name}
		</Card.Title>
		<Card.Description>by {tool.author}</Card.Description>
		<Card.Description>
			<Badge>
				{tool.source}
			</Badge>
			<Badge>
				{tool.type}
			</Badge>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex w-full flex-col gap-4">
			<p>{tool.description}</p>

			<div class="flex flex-col gap-2">
				<div class="flex flex-auto items-center justify-between">
					<span class="text-md">Installation:</span>
					<Button variant="ghost" size="icon" on:click={() => copyInstallCode()}>
						<Clipboard class="h-4 w-4" />
					</Button>
				</div>
				<div class="overflow-scroll border p-2">
					<Highlight
						class="text-xs  text-muted-foreground"
						language={shell}
						code={installCode(tool)}
					/>
				</div>
			</div>

			{#if showBins && tool.bins}
				<div>
					<span class="text-md">Available bins:</span>

					<div class="flex items-end gap-1 text-xs">
						{#each tool.bins as bin, i}
							<code class="rounded-xl border p-1 text-muted-foreground">{bin.bin}</code>
							{#if i !== tool.bins.length - 1}
								<span>,{' '}</span>
							{/if}
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</Card.Content>
	<Card.Footer>
		<div class="flex w-full flex-row-reverse gap-2">
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<Button builders={[builder]} variant="secondary" size="icon" href={tool.repository}>
						<GitBranch class="h-4 w-4" />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Open Git-Repository</p>
				</Tooltip.Content>
			</Tooltip.Root>
			{#if tool.homepage}
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button builders={[builder]} variant="secondary" size="icon" href={tool.homepage}>
							<Globe class="h-4 w-4" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Open Homepage</p>
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		</div>
	</Card.Footer>
</Card.Root>
