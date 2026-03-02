import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rawSetting from "./setting.json";
import type { Setting } from "./src/types";

const setting = rawSetting as Setting;

process.env.VITE_META_DESCRIPTION = setting.site.description;
process.env.VITE_META_KEYWORDS = setting.hero
  .map((hero) => hero.targetName)
  .join(", ");
process.env.VITE_META_AUTHOR = setting.hero
  .map((hero) => hero.targetName)
  .join(", ");

process.env.VITE_OG_SITE_NAME = setting.site.name;
process.env.VITE_OG_TITLE = setting.site.title;
process.env.VITE_OG_IMAGE = setting.site.image.url;
process.env.VITE_OG_IMAGE_WIDTH = setting.site.image.width.toString();
process.env.VITE_OG_IMAGE_HEIGHT = setting.site.image.height.toString();
process.env.VITE_OG_URL = setting.site.url;
process.env.VITE_TITLE = setting.site.title;
process.env.VITE_KAKAO_JS_KEY =
  setting.share?.kakaotalk?.key || setting.map?.kakao_map_key || "";
process.env.VITE_ENABLE_SAKURA = String(setting.effects?.sakura ?? true);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.originalFileName?.includes("src/assets/")) {
            const path = assetInfo.originalFileName.replace("src/assets/", "");
            const lastDotIndex = path.lastIndexOf(".");
            const name =
              lastDotIndex !== -1 ? path.substring(0, lastDotIndex) : path;
            const ext =
              lastDotIndex !== -1 ? path.substring(lastDotIndex + 1) : "";
            return `assets/${name}-[hash].${ext}`;
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
