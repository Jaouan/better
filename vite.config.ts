import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [["babel-plugin-react-compiler"]] } }),
    tailwind(),
  ],
  esbuild: {
    legalComments: "none",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
