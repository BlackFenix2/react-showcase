"use client";

import React from "react";

import { observer } from "mobx-react-lite";
import birdStore from "@/state/stores/games/birdStore";
import Board from "@/components/Views/FlappyBird/Board";
import Debug from "@/components/Views/FlappyBird/Debug";
import PageContainer from "@/components/layout/PageContainer";
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { BugReport, PlayArrow, Refresh, SportsEsports } from "@mui/icons-material";
import { BIRD_BOARD_HEIGHT, BIRD_BOARD_WIDTH } from "@/state/stores/games/birdStore";

const FlappyBird = () => {
  const BirdStore = React.useContext(birdStore);

  const nv = React.useRef<HTMLDivElement>(null);

  const [debugMode, setDebugMode] = React.useState(false);

  React.useEffect(() => {
    return () => {
      BirdStore.unMountGame();
    };
  }, [BirdStore]);

  const resetGame = () => {
    BirdStore.Reset();
  };

  const startGame = () => {
    if (nv.current) {
      BirdStore.startGameLoop(nv.current);
    }
  };

  const toggleDebug = () => {
    setDebugMode((current) => !current);
  };

  return (
    <PageContainer title="Flappy Bird">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 5,
              color: "#eef6ff",
              background:
                "radial-gradient(circle at top left, rgba(255,207,107,0.18), transparent 30%), linear-gradient(155deg, #10375a 0%, #16527e 52%, #0b2238 100%)",
              boxShadow: "0 26px 60px rgba(11, 34, 56, 0.24)",
            }}
          >
            <CardContent>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <SportsEsports sx={{ color: "#ffd166" }} />
                  <Typography variant="overline" sx={{ letterSpacing: "0.2em", opacity: 0.82 }}>
                    ARCADE RUN
                  </Typography>
                </Stack>

                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.05 }}>
                    Tap to flap and thread the gap.
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: "rgba(238,246,255,0.78)" }}>
                    Click inside the board or press space to climb. Every pipe column you clear adds to your score.
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                  <Chip
                    label={`Score ${BirdStore.score}`}
                    sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }}
                  />
                  <Chip
                    label={`Best ${BirdStore.bestScore}`}
                    sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }}
                  />
                  <Chip
                    label={BirdStore.gameOver ? "Crashed" : BirdStore.gameStart ? "In flight" : "Idle"}
                    sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }}
                  />
                </Stack>

                <Typography sx={{ minHeight: 48, color: "rgba(238,246,255,0.84)" }}>{BirdStore.status}</Typography>

                <Stack direction={{ xs: "column", sm: "row", md: "column", lg: "row" }} spacing={1.5}>
                  <Button variant="contained" size="large" onClick={startGame} startIcon={<PlayArrow />}>
                    {BirdStore.gameStart ? "Running" : "Start Flight"}
                  </Button>
                  <Button variant="outlined" size="large" onClick={resetGame} startIcon={<Refresh />}>
                    Reset
                  </Button>
                  <Button variant="outlined" size="large" onClick={toggleDebug} startIcon={<BugReport />}>
                    {debugMode ? "Hide Debug" : "Show Debug"}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={2}>
            <Card sx={{ borderRadius: 5, overflow: "hidden" }}>
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      Runway
                    </Typography>
                    <Typography color="text.secondary">
                      Click inside the playfield to give the bird a lift. Space works too.
                    </Typography>
                  </Box>

                  <Box
                    ref={nv}
                    sx={{
                      width: "100%",
                      maxWidth: BIRD_BOARD_WIDTH,
                      borderRadius: 4,
                      overflow: "hidden",
                      border: "1px solid rgba(16,55,90,0.12)",
                      boxShadow: "0 20px 42px rgba(16,55,90,0.16)",
                    }}
                  >
                    <Board height={BIRD_BOARD_HEIGHT} width={BIRD_BOARD_WIDTH} debug={debugMode} />
                  </Box>
                </Stack>
              </CardContent>
            </Card>

            {debugMode && (
              <Card sx={{ borderRadius: 5 }}>
                <CardContent>
                  <Debug stats={BirdStore as any} />
                </CardContent>
              </Card>
            )}
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default observer(FlappyBird);
