import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_BACKEND_URL || "http://127.0.0.1:8000";

  return {
    plugins: [react(), tailwindcss()],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            maxSize: 450_000,
            groups: [
              {
                name: "three",
                test: /node_modules[\\/]three[\\/]/,
                priority: 10,
              },
              {
                name: "react-three",
                test: /node_modules[\\/]@react-three[\\/]/,
                priority: 8,
              },
              {
                name: "gsap",
                test: /node_modules[\\/]gsap[\\/]/,
                priority: 7,
              },
            ],
          },
        },
      },
    },
    server: {
      proxy: {
        "/api": { target: backendUrl, changeOrigin: true },
        "/media": { target: backendUrl, changeOrigin: true },
      },
    },
  };
});
