import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'My Docs',
    customCss: [
        './src/tailwind.css'
    ],
    social: {
      github: 'https://github.com/withastro/starlight'
    },
    sidebar: [{
      label: 'Examples',
      autogenerate: { directory: 'examples' },
    },{
      label: 'Information',
      autogenerate: {
        directory: 'info'
      }
    }],
    tableOfContents: false,
    pagination: false
  }), tailwind({
    applyBaseStyles: false
  })]
});