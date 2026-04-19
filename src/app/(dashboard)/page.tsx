import * as React from "react";
import PageContainer from "@/components/layout/PageContainer";
import CountDown from "@/components/modules/Countdown";

export default function HomePage() {
  const windowsServer2016Eol = new Date(2027, 0, 12);
  return (
    <PageContainer>
      <CountDown date={windowsServer2016Eol} label="Windows Server 2016 - January 12, 2027"></CountDown>
    </PageContainer>
  );
}
