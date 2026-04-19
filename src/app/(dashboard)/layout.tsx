import * as React from "react";
import AppShell from "@/components/layout/AppShell";

export default function Layout(props: { children: React.ReactNode }) {
  return <AppShell>{props.children}</AppShell>;
}
