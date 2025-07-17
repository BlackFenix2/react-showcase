import * as React from "react";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import Footer from "./Footer";

export default function Layout(props: { children: React.ReactNode }) {
  return <DashboardLayout>{props.children}</DashboardLayout>;
}
