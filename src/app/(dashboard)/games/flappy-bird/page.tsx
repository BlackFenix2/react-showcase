"use client";

import React from "react";

import { observer } from "mobx-react-lite";
import birdStore from "@/state/stores/games/birdStore";
import Board from "@/components/Views/FlappyBird/Board";
import Debug from "@/components/Views/FlappyBird/Debug";
import { Grid, Button } from "@mui/material";

const FlappyBird = () => {
  const BirdStore = React.useContext(birdStore);

  const nv = React.useRef<HTMLDivElement>(null);

  const [debugMode, setDebugMode] = React.useState(false);

  React.useEffect(() => {
    console.log("mount");
    return () => {
      console.log("unmount");
      BirdStore.unMountGame();
    };
  }, [BirdStore]);

  const Reset = () => {
    BirdStore.Reset();
  };

  const startGame = () => {
    if (nv.current) {
      BirdStore.startGameLoop(nv.current);
    }
  };

  const toggleDebug = () => {
    setDebugMode(!debugMode);
  };

  return (
    <Grid container>
      <Grid>
        <h2>
          Flappy Bird Test
          <Button variant="contained" color="primary" onClick={startGame}>
            Start Game
          </Button>
          <Button variant="contained" color="primary" onClick={Reset}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={toggleDebug}>
            Debug
          </Button>
        </h2>
        <p>
          assets on loan curtesy from this fella -
          <a href="https://jimmyoliva.com" target="_blank" rel="noopener noreferrer">
            https://jimmyoliva.com
          </a>
        </p>
        {/* eslint-disable-next-line no-return-assign */}

        <div ref={nv}>
          <Board height={400} width={600} debug={debugMode} />
        </div>
      </Grid>
      <Grid>{debugMode && <Debug stats={BirdStore as any} />}</Grid>
    </Grid>
  );
};

export default observer(FlappyBird);
