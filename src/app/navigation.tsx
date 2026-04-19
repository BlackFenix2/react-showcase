import * as React from "react";
import GavelIcon from "@mui/icons-material/Gavel";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MovieIcon from "@mui/icons-material/Movie";
import PetsIcon from "@mui/icons-material/Pets";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";

export interface AppNavigationItem {
  segment: string;
  title: string;
  icon: React.ReactNode;
  children?: AppNavigationItem[];
}

export const APP_NAVIGATION: AppNavigationItem[] = [
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
      { segment: "flappy-bird", title: "Flappy Bird", icon: <VideogameAssetIcon /> },
      { segment: "simon", title: "Simon", icon: <VideogameAssetIcon /> },
    ],
  },
  {
    segment: "license",
    title: "License",
    icon: <GavelIcon />,
  },
];
