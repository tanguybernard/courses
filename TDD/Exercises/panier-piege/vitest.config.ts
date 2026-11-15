import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Seuls les tests copiés dans src/ sont exécutés (les dossiers etapes/ sont des sauvegardes)
    include: ["src/**/*.test.ts"],
  },
});
