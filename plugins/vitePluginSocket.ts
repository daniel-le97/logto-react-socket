import type { Plugin } from "vite";
import keys from ".tmp/externals.json";

// https://github.com/vitejs/vite/issues/6582#issuecomment-1988662224
export function vitePluginSocket(): Plugin {
  const importKeys = keys;
  const VALID_ID_PREFIX = `/@id/`;
  const reg = new RegExp(`${VALID_ID_PREFIX}(${importKeys.join("|")})`, "g");

  return {
    name: "vite-plugin-ignore-static-import",
    enforce: "pre",

    // 1. insert to optimizeDeps.exclude to prevent pre-transform
    config(userConfig) {
      const config = { ...userConfig };

      config.build = { ...config.build };
      config.build.rollupOptions = { ...config.build.rollupOptions };

      config.build.rollupOptions.external =
        config.build.rollupOptions.external || [];

      if (typeof config.build.rollupOptions.external === "string") {
        config.build.rollupOptions.external = [
          config.build.rollupOptions.external,
        ];
      }
      if (Array.isArray(config.build.rollupOptions.external)) {
        config.build.rollupOptions.external.push(/^socket:.*/);
      }
      config.optimizeDeps = {
        ...(config.optimizeDeps ?? {}),
        exclude: [...(config.optimizeDeps?.exclude ?? []), ...importKeys],
      };
      return config;
    },
    // 2. push a plugin to rewrite the 'vite:import-analysis' prefix
    configResolved(resolvedConfig) {
      //@ts-expect-error this works
      resolvedConfig.plugins.push({
        name: "vite-plugin-ignore-static-import-replace-idprefix",
        transform: (code: string) => {
          code = reg.test(code) ? code.replace(reg, (m, s1) => s1) : code;
          return { code, map: null };
        },
      });
    },
    // 3. rewrite the id before 'vite:resolve' plugin transform to 'node_modules/...'
    resolveId: (id) => {
      if (importKeys.includes(id)) {
        return { id, external: true };
      }
    },
    load(id) {
      if (importKeys.includes(id)) {
        return "";
      }
    },
  };
}
