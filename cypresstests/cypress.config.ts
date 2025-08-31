import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
export default defineConfig({
  projectId: "181dvh",
  e2e: {

    baseUrl: 'https://www.demoblaze.com',
    viewportWidth: 1366,
    viewportHeight: 900,


    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
  },
});
