"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { APP_NAVIGATION, AppNavigationItem } from "@/app/navigation";
import Footer from "@/app/(dashboard)/Footer";

const DRAWER_WIDTH = 280;

function buildPath(parentPath: string, segment: string) {
  return `${parentPath}/${segment}`.replace(/\/+/g, "/");
}

function isSelected(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationItems(props: {
  pathname: string;
  items: AppNavigationItem[];
  parentPath?: string;
  level?: number;
  onNavigate?: () => void;
}) {
  const parentPath = props.parentPath ?? "";
  const level = props.level ?? 0;

  return (
    <List disablePadding>
      {props.items.map((item) => {
        const href = buildPath(parentPath, item.segment);
        const selected = isSelected(props.pathname, href);

        return (
          <React.Fragment key={href}>
            <ListItemButton
              component={Link}
              href={href}
              onClick={props.onNavigate}
              selected={selected}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                pl: 2 + level * 2,
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
              {item.children ? <ChevronRightIcon sx={{ opacity: 0.6 }} /> : null}
            </ListItemButton>
            {item.children ? (
              <NavigationItems
                pathname={props.pathname}
                items={item.children}
                parentPath={href}
                level={level + 1}
                onNavigate={props.onNavigate}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </List>
  );
}

export default function AppShell(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const closeDrawer = React.useCallback(() => setMobileOpen(false), []);

  const drawerContent = (
    <Box sx={{ display: "flex", minHeight: "100%", flexDirection: "column" }}>
      <Box sx={{ px: 2.5, py: 3 }}>
        <Typography component={Link} href="/" sx={{ color: "inherit", textDecoration: "none", fontSize: 22, fontWeight: 800 }}>
          React Showcase
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          MUI-native app shell
        </Typography>
      </Box>
      <Box sx={{ px: 1, pb: 2 }}>
        <Typography variant="overline" sx={{ px: 2, color: "text.secondary", letterSpacing: "0.16em" }}>
          Main Items
        </Typography>
      </Box>
      <Box sx={{ flex: 1, pb: 2 }}>
        <NavigationItems pathname={pathname} items={APP_NAVIGATION} onNavigate={closeDrawer} />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Stack spacing={0}>
            <Typography variant="body2" color="text.secondary">
              Dashboard
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {pathname === "/" ? "Home" : pathname.split("/").at(-1)?.replace(/-/g, " ")}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={closeDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flex: 1, display: "flex", minWidth: 0, flexDirection: "column" }}>
        <Toolbar />
        <Box sx={{ flex: 1 }}>{props.children}</Box>
        <Footer />
      </Box>
    </Box>
  );
}