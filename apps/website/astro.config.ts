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
            description: 'Software Engineer specialized in designing robust, scalable products through thoughtful software architecture tailored to your product.',
          },
          {
            path: '/thumbnails/fr',
            title: 'Baptiste Parmantier',
            description: 'Software Engineer spécialisé dans la conception de produits robustes et scalables grâce à une architecture logicielle réfléchie et adaptée à votre produit.',
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
