/*
 * Copyright 2022-2023 VMware, Inc.
 * SPDX-License-Identifier: MIT
 */

import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#49AFD9",
    },
    secondary: {
      main: "#002538",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
