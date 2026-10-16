import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET(context) {
	const entries = (await getCollection('homelab')).sort((a, b) => b.data.entry - a.data.entry);
	return rss({
		title: 'Camille Stennis: Homelab Log',
		description: 'Notes from my home lab: what I built, what broke, and what I learned.',
		site: context.site,
		items: entries.map((e) => ({
			title: e.data.title,
			description: e.data.description,
			pubDate: e.data.date,
			link: `/homelab/${e.id}/`,
		})),
	});
}
