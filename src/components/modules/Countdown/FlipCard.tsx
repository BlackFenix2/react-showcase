import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";

export const FirstCard = styled.div<{
  flip: boolean;
  reset: boolean;
  size: number;
}>`
  font-size: ${(props) => props.size}px;
  line-height: normal;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  /* Slide from center to below */
  transform: ${(props) =>
    props.flip ? "translateY(60%)" : "translateY(-50%)"};
  opacity: ${(props) => (props.flip ? 0 : 1)};
  transition: ${(props) =>
    !props.reset
      ? "transform 0.3s, opacity 0.3s"
      : "transform 0.0s, opacity 0.0s"};
`;

export const SecondCard = styled.div<{
  flip: boolean;
  reset: boolean;
  size: number;
}>`
  font-size: ${(props) => props.size}px;
  line-height: normal;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  /* Slide from above to center */
  transform: ${(props) =>
    props.flip ? "translateY(-50%)" : "translateY(-160%)"};
  opacity: ${(props) => (props.flip ? 1 : 0)};
  transition: ${(props) =>
    !props.reset
      ? "transform 0.3s, opacity 0.3s"
      : "transform 0.0s, opacity 0.0s"};
`;

interface Props {
  time: number;
  size: number;
}

const FlipCard: React.FC<Props> = ({ time: newTime, size }) => {
  const [flip, setFlip] = useState(false);
  const [reset, setReset] = useState(false);
  const [time, setTime] = useState({
    currentTime: newTime,
    previousTime: newTime,
  });
  const mounted = useRef(false);

  const transitionEnded = () => {
    setReset(true);
    setFlip(false);
    setTime((prev) => ({
      currentTime: prev.currentTime,
      previousTime: newTime,
    }));
  };

  useEffect(() => {
    setReset(false);
    if (mounted.current) {
      setFlip(true);
    }
    setTime((prev) => ({
      currentTime: newTime,
      previousTime: prev.currentTime ?? newTime,
    }));
    mounted.current = true;
  }, [newTime]);

  return (
    <>
      <FirstCard
        flip={flip}
        reset={reset}
        size={size}
        onTransitionEnd={transitionEnded}
      >
        {time.previousTime.toString().padStart(2, "0")}
      </FirstCard>
      <SecondCard flip={flip} reset={reset} size={size}>
        {time.currentTime.toString().padStart(2, "0")}
      </SecondCard>
    </>
  );
};

export default FlipCard;
