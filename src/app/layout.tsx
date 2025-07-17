"use client";

import * as React from "react";
import { NextAppProvider } from "@toolpad/core/nextjs";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import PersonIcon from "@mui/icons-material/Person";
import LinearProgress from "@mui/material/LinearProgress";
import type { Navigation } from "@toolpad/core/AppProvider";
import ListAltIcon from "@mui/icons-material/ListAlt";
import WebIcon from "@mui/icons-material/Web";
import PetsIcon from "@mui/icons-material/Pets";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import GavelIcon from "@mui/icons-material/Gavel";
import { StoreProvider } from "easy-peasy";
import store from "@/state";

import theme from "./theme";

// export const metadata = {
//   title: "My Toolpad Core Next.js App",
//   description: "This is a sample app built with Toolpad Core and Next.js",
// };

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "todo",
    title: "To-Do List",
    icon: <ListAltIcon />,
  },
  {
    segment: "shows",
    title: "Shows",
    icon: <MovieIcon />,
  },
  {
    segment: "cats",
    title: "Cats",
    icon: <PetsIcon />,
  },
  {
    segment: "games",
    title: "Games",
    icon: <VideogameAssetIcon />,
    children: [
      { segment: "tic-tac-toe", title: "Tic Tac Toe", icon: <VideogameAssetIcon /> },
      {
        segment: "flappy-bird",
        title: "Flappy Bird",
        icon: <VideogameAssetIcon />,
      },
      {
        segment: "number-guesser",
        title: "Number Guesser",
        icon: <VideogameAssetIcon />,
      },
    ],
  },
  {
    segment: "license",
    title: "License",
    icon: <GavelIcon />,
  },
];

const BRANDING = {
  title: "React Showcase",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <StoreProvider store={store}>
            <React.Suspense fallback={<LinearProgress />}>
              <NextAppProvider navigation={NAVIGATION} branding={BRANDING} theme={theme}>
                {props.children}
              </NextAppProvider>
            </React.Suspense>
          </StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
