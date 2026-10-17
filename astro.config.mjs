// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.gravit.world',
	integrations: [
		starlight({
			title: 'Gravit Docs',
			description: 'Documentation for the open tools of the Gravit Open Network Foundation: verifier, API, receipts, Capability Gate, Graviteron, History Keeper, Gravit Path.',
			logo: { src: './src/assets/logo.webp', alt: 'Gravit' },
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/gravit-open-network-foundation' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/gravitopnetwork' },
			],
			editLink: { baseUrl: 'https://github.com/gravit-open-network-foundation/gravit-docs/edit/main/' },
			lastUpdated: true,
			customCss: ['./src/styles/gravit.css'],
			head: [
				// Light theme by default, like most documentation; the reader's own choice is kept.
				{ tag: 'script', content: "try{if(!localStorage.getItem('starlight-theme'))localStorage.setItem('starlight-theme','light')}catch(e){}" },
			],
			sidebar: [
				{ label: 'Start here', items: ['start/first-check', 'start/get-key', 'start/plans'] },
				{ label: 'Verifier and API', items: ['verifier/how-it-decides', 'verifier/api', 'verifier/sdk', 'verifier/receipts'] },
				{ label: 'AI agents', items: ['agents/capability-gate'] },
				{ label: 'Tools', items: ['tools/graviteron', 'tools/history-keeper', 'tools/gravit-path'] },
				{ label: 'Standard and trust', items: ['standard/gevp', 'standard/corrections'] },
			],
		}),
	],
});
