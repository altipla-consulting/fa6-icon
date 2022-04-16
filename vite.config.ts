
import { resolve } from 'path'

import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


export default (({ mode }) => {
  let config: UserConfig = {
    build: {
      sourcemap: true,
    },
    plugins: [
      vue(),
    ],
  }

  if (mode === 'lib') {
    config.build.lib = {
      entry: resolve(process.cwd(), 'src', 'lib.ts'),
      formats: ['es'],
    }
    config.build.rollupOptions = {
      external: ['vue', '@fortawesome/fontawesome-svg-core'],
    }
  }

  return config
})
