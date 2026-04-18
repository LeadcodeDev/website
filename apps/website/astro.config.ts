import react from '@astrojs/react'
import { thumbnailIntegration } from '@explainer/thumbnail/integration'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: process.env.PUBLIC_WEBSITE_URL || undefined,
  integrations: [
    react(),
    thumbnailIntegration({
      appName: 'Baptiste Parmantier',
      content: {
        type: 'static',
        pages: [
          {
            path: '/',
            title: 'Baptiste Parmantier',
            description: 'Software Architect & IAM Expert. Co-founder of FerrisKey.',
          },
          {
            path: '/thumbnails/fr',
            title: 'Baptiste Parmantier',
            description: 'Architecte logiciel & expert IAM. Co-fondateur de FerrisKey.',
          },
        ],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    envDir: '../../',
  },
})
