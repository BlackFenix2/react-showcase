"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline, LinearProgress, ThemeProvider } from "@mui/material";
import { StoreProvider } from "easy-peasy";
import store from "@/state";

import theme from "./theme";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <StoreProvider store={store}>
              <React.Suspense fallback={<LinearProgress />}>
                {props.children}
              </React.Suspense>
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
