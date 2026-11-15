import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // le dossier src/ est vide au départ : les étudiants écrivent le premier test
    passWithNoTests: true,
  },
});
