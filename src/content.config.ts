import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Homelab Log: one Markdown file per entry in src/content/homelab/.
// To add an entry, copy an existing file, bump the number, and write.
const homelab = defineCollection({
	loader: glob({ base: './src/content/homelab', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		entry: z.number(),
		date: z.coerce.date(),
		description: z.string(),
	}),
});

export const collections = { homelab };
