import * as React from "react";
import Typography from "@mui/material/Typography";
import { PageContainer } from "@toolpad/core/PageContainer";
import Link from "next/link";
import CountDown from "@/components/modules/Countdown";

export default function HomePage() {
  const windows11Eol = new Date(2025, 10, 15);
  return (
    <PageContainer>
      <CountDown date={windows11Eol} label="Goodbye Windows 10"></CountDown>
    </PageContainer>
  );
}
