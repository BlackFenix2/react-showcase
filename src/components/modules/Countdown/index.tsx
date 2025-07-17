"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { Box, Typography } from "@mui/material";
import CountdownUnit from "./CountdownUnit";

interface Timer {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeLeft = (date: moment.MomentInput): Timer => {
  const now = moment();
  const then = moment(date);
  const diff = moment.duration(then.diff(now));
  const totalSeconds = diff.asSeconds();

  if (totalSeconds <= 0) {
    return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    months: diff.months(),
    days: diff.days(),
    hours: diff.hours(),
    minutes: diff.minutes(),
    seconds: diff.seconds(),
  };
};

const CountDown = ({
  date,
  label,
}: {
  date: moment.MomentInput;
  label: React.ReactNode;
}) => {
  const [timer, setTimer] = useState<Timer>(() => getTimeLeft(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getTimeLeft(date));
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  const units = [
    { label: "Months", time: timer.months, maxValue: 12 },
    { label: "Days", time: timer.days, maxValue: 31 },
    { label: "Hours", time: timer.hours, maxValue: 24 },
    { label: "Minutes", time: timer.minutes, maxValue: 60 },
    { label: "Seconds", time: timer.seconds, maxValue: 60 },
  ];

  return (
    <Box>
      <Typography variant="h3" textAlign="center">
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          flex: 1,
        }}
      >
        {units.map((unit) => (
          <CountdownUnit
            key={unit.label}
            label={unit.label}
            time={unit.time}
            maxValue={unit.maxValue}
            isInverted={unit.label !== "Minutes"}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CountDown;
