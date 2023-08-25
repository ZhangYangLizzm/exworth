import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver, VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://ppcmch.exworthdev.cc',
        changeOrigin: true
      },
      '/static': {
        target: 'https://devpro.exworthdev.cc',
        changeOrigin: true
      }
    },
  },
  build: {
    rollupOptions: {
      external: [
        /^\/staticcdn\/*/
      ],
      output: {
        globals: {
          // vue: 'Vue',
          // 'vue-router': 'VueRouter',
          // 'vue-i18n': 'VueI18n',
          // 'pinia': 'Pinia',
        }
      }
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    vue(),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md  
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        {
          'vue-router': [
            'useRoute',
            'useRouter',
            'createRouter',
            'createWebHistory'
          ],
          'pinia': [
            'defineStore',
            'createPinia',
            'storeToRefs',
          ]
        },
        {
          'vuex': [
            'useStore'
          ],
          'vue-i18n': [
            'useI18n',
            'createI18n'
          ],
          'dayjs': [['default', 'dayjs']]
        }
      ],
      dirs: [
        './src/libs/components/*',
        './src/libs/hooks',
        './src/plugins'
      ]
    }),
    Components({
      directoryAsNamespace: true,
      resolvers: [
        AntDesignVueResolver({
          importStyle: 'less',
          resolveIcons: true
        }),
        VantResolver()
      ]
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [
        // libs组件内
        path.resolve(process.cwd(), 'src/libs/assets/svg'),
        // 如果自有项目组件可额外添加
        // path.resolve(process.cwd(), 'src/assets/svg')
      ],
      // Specify symbolId format
      symbolId: 'svg-[dir]-[name]',
      /**
         * 自定义插入位置
         * @default: body-last
         */
      // inject?: 'body-last' | 'body-first',

      /**
       * custom dom id
       * @default: __svg__icons__dom__
       */
      // customDomId: '__svg__icons__dom__',
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#0cbf53',
          'success-color': '#0cbf53',
          'font-size-lg': '14px',
          'radius-base': '4px',
          'btn-border-radius-base': '4px'
        }
      }
    }
  }
})
