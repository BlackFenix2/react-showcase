import React, { useEffect } from "react";
import { css } from "@emotion/css";
import { Box, CircularProgress, Typography } from "@mui/material";
import FlipCard from "./FlipCard";

interface CountdownUnitProps {
  label: string;
  time: number;
  maxValue: number;
  isInverted?: boolean;
}

const CountdownUnit = (props: CountdownUnitProps) => {
  const calculatedPercent = (props.time / props.maxValue) * 100;
  const percent = props.isInverted ? 100 - calculatedPercent : calculatedPercent;

  return (
    <Box
      sx={{
        margin: 1,
        padding: 2,
        position: "relative",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 1 }}>
        {props.label}
      </Typography>
      <CircularProgress
        variant="determinate"
        value={percent}
        size={180}
        color={percent === 100 ? "success" : "primary"}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: "100%",
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: "100%",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 80,
              left: -30,
              bottom: 50,
              right: 0,
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "100%",
                width: "120px",
              }}
            >
              <FlipCard time={props.time} size={50} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(CountdownUnit);
