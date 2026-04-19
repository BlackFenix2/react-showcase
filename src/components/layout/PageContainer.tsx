import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";

interface Props {
  title?: React.ReactNode;
  children: React.ReactNode;
}

export default function PageContainer(props: Props) {
  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 3 } }}>
      {props.title ? (
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="overline" sx={{ letterSpacing: "0.18em", color: "text.secondary" }}>
            React Showcase
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.05 }}>
            {props.title}
          </Typography>
        </Stack>
      ) : null}
      {props.children}
    </Box>
  );
}
