import contentCollections from "@content-collections/vite";
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import json5 from '@miyaneee/rollup-plugin-json5'

export default defineConfig({
  plugins: [json5(), sveltekit(), contentCollections()]
})
