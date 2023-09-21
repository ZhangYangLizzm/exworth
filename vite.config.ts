import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 9091,
    proxy: {
      "/api": {
        target: "https://ppcmch.exworthdev.cc",
        changeOrigin: true,
      },
      "/static": {
        target: "https://devpro.exworthdev.cc",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      imports: [
        "vue",
        {
          "vue-router": [
            "useRoute",
            "useRouter",
            "createRouter",
            "createWebHistory",
          ],
          pinia: ["defineStore", "createPinia", "storeToRefs"],
          "vue-i18n": ["useI18n", "createI18n"],
        },
      ],
    }),
    Components({
      dts: true,
      resolvers: [
        AntDesignVueResolver({ importStyle: "less", resolveIcons: true }),
      ],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      // Specify symbolId format
      symbolId: "svg-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
