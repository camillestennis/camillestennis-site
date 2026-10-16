// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://camillestennis.com',
	trailingSlash: 'ignore',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Geist',
			cssVariable: '--font-sans',
			weights: [400, 500, 600, 700],
			fallbacks: ['system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'JetBrains Mono',
			cssVariable: '--font-mono',
			weights: [400, 500, 700],
			fallbacks: ['ui-monospace', 'monospace'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Press Start 2P',
			cssVariable: '--font-pixel',
			weights: [400],
			fallbacks: ['ui-monospace', 'monospace'],
		},
	],
});
