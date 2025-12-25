import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'adapty-blog',
  title: 'Adapty Blog CMS',

  // Demo project ID - replace with your own in production
  projectId: 'demo-project',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },

  // Studio configuration
  studio: {
    components: {
      // Custom branding can be added here
    },
  },
})
