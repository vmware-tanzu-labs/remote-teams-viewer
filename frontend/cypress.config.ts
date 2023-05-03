/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
