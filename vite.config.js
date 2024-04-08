import react from "@vitejs/plugin-react";
import { defineConfig, transformWithEsbuild, loadEnv } from "vite";

const cherryPickedKeys = [
  "VITE_API_KEY",
  "VITE_AUTH_DOMAIN",
  "VITE_PROJECT_ID",
  "VITE_DATABASE_URL",
  "VITE_STORAGE_BUCKET",
  "VITE_MESSAGING_SENDER_ID",
  "VITE_APP_ID",
  "VITE_MEASUREMENT_ID",
];

export default defineConfig((mode) => {
  const env = loadEnv(mode, process.cwd(), "");
  const processEnv = {};
  cherryPickedKeys.forEach((key) => (processEnv[key] = env[key]));

  return {
    root: "src/",
    publicDir: "../public/",
    base: "./",
    define: {
      "process.env": processEnv,
    },
    plugins: [
      // React support
      react(),

      // .js file support as if it was JSX
      {
        name: "load+transform-js-files-as-jsx",
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;

          return transformWithEsbuild(code, id, {
            loader: "jsx",
            jsx: "automatic",
          });
        },
      },
    ],
    server: {
      host: true, // Open to local network and display URL
      open: !(
        "SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env
      ), // Open if it's not a CodeSandbox
    },
    build: {
      outDir: "../dist", // Output in the dist/ folder
      emptyOutDir: true, // Empty the folder first
      sourcemap: true, // Add sourcemap
    },
  };
});
