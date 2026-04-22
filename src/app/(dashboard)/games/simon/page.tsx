"use client";
import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Box, Button, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { AutoAwesome, Bolt, Memory, Replay, VolumeOff, VolumeUp } from "@mui/icons-material";

const padConfigs = [
  { label: "Ruby", color: "#df4a4a", glow: "rgba(223, 74, 74, 0.55)", frequency: 329.63 },
  { label: "Sun", color: "#f3b53f", glow: "rgba(243, 181, 63, 0.55)", frequency: 392.0 },
  { label: "Mint", color: "#39b980", glow: "rgba(57, 185, 128, 0.55)", frequency: 493.88 },
  { label: "Ocean", color: "#3d80f2", glow: "rgba(61, 128, 242, 0.55)", frequency: 587.33 },
] as const;

const FLASH_MS = 500;
const GAP_MS = 180;
const NEXT_ROUND_DELAY_MS = 700;

const getRandomPadIndex = () => Math.floor(Math.random() * padConfigs.length);

const SimonSaysPage = () => {
  const [sequence, setSequence] = React.useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = React.useState<number[]>([]);
  const [activePad, setActivePad] = React.useState<number | null>(null);
  const [status, setStatus] = React.useState("Press start and memorize the pattern.");
  const [isShowingSequence, setIsShowingSequence] = React.useState(false);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [bestScore, setBestScore] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(false);
  const timeoutIds = React.useRef<number[]>([]);
  const audioContextRef = React.useRef<AudioContext | null>(null);

  const getAudioContext = React.useCallback(async () => {
    if (typeof window === "undefined") {
      return null;
    }

    if (!audioContextRef.current) {
      const AudioContextCtor =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextCtor) {
        return null;
      }

      audioContextRef.current = new AudioContextCtor();
    }

    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    return audioContextRef.current;
  }, []);

  const playTone = React.useCallback(
    async (frequency: number, durationMs: number, type: OscillatorType = "sine", volume = 0.08) => {
      if (isMuted) {
        return;
      }

      const audioContext = await getAudioContext();
      if (!audioContext) {
        return;
      }

      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      const now = audioContext.currentTime;
      const durationSeconds = durationMs / 1000;

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, now);
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(volume, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + durationSeconds);
    },
    [getAudioContext, isMuted],
  );

  const wait = React.useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const timeoutId = window.setTimeout(() => {
        timeoutIds.current = timeoutIds.current.filter((id) => id !== timeoutId);
        resolve();
      }, ms);

      timeoutIds.current.push(timeoutId);
    });
  }, []);

  const playFailureTone = React.useCallback(async () => {
    await playTone(196, 220, "sawtooth", 0.09);
    await wait(80);
    await playTone(146.83, 320, "sawtooth", 0.09);
  }, [playTone, wait]);

  const playRoundAdvanceTone = React.useCallback(async () => {
    await playTone(659.25, 120, "triangle", 0.07);
    await wait(60);
    await playTone(783.99, 180, "triangle", 0.07);
  }, [playTone, wait]);

  const clearTimers = React.useCallback(() => {
    timeoutIds.current.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIds.current = [];
  }, []);

  React.useEffect(
    () => () => {
      clearTimers();
      audioContextRef.current?.close();
    },
    [clearTimers],
  );

  const flashPad = React.useCallback(
    async (padIndex: number) => {
      setActivePad(padIndex);
      void playTone(padConfigs[padIndex].frequency, FLASH_MS - 60, "triangle", 0.07);
      await wait(FLASH_MS);
      setActivePad(null);
      await wait(GAP_MS);
    },
    [playTone, wait],
  );

  const playSequence = React.useCallback(
    async (nextSequence: number[]) => {
      setIsShowingSequence(true);
      setStatus("Watch closely.");
      setPlayerSequence([]);

      await wait(300);

      for (const padIndex of nextSequence) {
        await flashPad(padIndex);
      }

      setIsShowingSequence(false);
      setStatus("Your turn. Repeat the pattern.");
    },
    [flashPad, wait],
  );

  const startGame = React.useCallback(async () => {
    clearTimers();
    await getAudioContext();

    const firstSequence = [getRandomPadIndex()];
    setSequence(firstSequence);
    setPlayerSequence([]);
    setIsGameOver(false);
    setStatus("New game.");

    await playSequence(firstSequence);
  }, [clearTimers, getAudioContext, playSequence]);

  const handlePadPress = React.useCallback(
    async (padIndex: number) => {
      if (isShowingSequence || sequence.length === 0 || isGameOver) {
        return;
      }

      await getAudioContext();
      setActivePad(padIndex);
      void playTone(padConfigs[padIndex].frequency, 180, "triangle", 0.08);
      const releaseId = window.setTimeout(() => {
        setActivePad((current) => (current === padIndex ? null : current));
        timeoutIds.current = timeoutIds.current.filter((id) => id !== releaseId);
      }, 180);
      timeoutIds.current.push(releaseId);

      const nextPlayerSequence = [...playerSequence, padIndex];
      const currentStep = nextPlayerSequence.length - 1;

      if (sequence[currentStep] !== padIndex) {
        const completedRounds = Math.max(0, sequence.length - 1);
        setBestScore((current) => Math.max(current, completedRounds));
        setIsGameOver(true);
        setStatus(`Wrong pad. You reached round ${sequence.length}.`);
        void playFailureTone();
        return;
      }

      if (nextPlayerSequence.length === sequence.length) {
        const completedRounds = sequence.length;
        setBestScore((current) => Math.max(current, completedRounds));
        setStatus("Nice. Next round incoming.");
        setPlayerSequence([]);
        void playRoundAdvanceTone();

        const nextSequence = [...sequence, getRandomPadIndex()];
        setSequence(nextSequence);
        await wait(NEXT_ROUND_DELAY_MS);
        await playSequence(nextSequence);
        return;
      }

      setPlayerSequence(nextPlayerSequence);
    },
    [
      getAudioContext,
      isGameOver,
      isShowingSequence,
      playFailureTone,
      playRoundAdvanceTone,
      playSequence,
      playTone,
      playerSequence,
      sequence,
      wait,
    ],
  );

  const round = sequence.length;
  const currentScore = Math.max(0, round - 1);

  return (
    <PageContainer title="Simon">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 5,
              color: "#f4f7fb",
              background:
                "radial-gradient(circle at top left, rgba(255,206,99,0.18), transparent 28%), linear-gradient(155deg, #151e34 0%, #1b355a 52%, #102846 100%)",
              boxShadow: "0 28px 60px rgba(16, 40, 70, 0.28)",
            }}
          >
            <CardContent>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Memory sx={{ color: "#ffd166" }} />
                  <Typography variant="overline" sx={{ letterSpacing: "0.2em", opacity: 0.82 }}>
                    MEMORY GAME
                  </Typography>
                </Stack>

                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.05 }}>
                    Watch the lights, then play the pattern back.
                  </Typography>
                  <Typography sx={{ mt: 1.5, color: "rgba(244,247,251,0.78)" }}>
                    Each round adds one more step. Miss a color and the run ends.
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                  <Chip
                    icon={<Bolt />}
                    label={`Round ${round || 1}`}
                    sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }}
                  />
                  <Chip
                    icon={<AutoAwesome />}
                    label={`Best ${bestScore}`}
                    sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }}
                  />
                  <Chip label={`Score ${currentScore}`} sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }} />
                </Stack>

                <Typography sx={{ minHeight: 48, color: "rgba(244,247,251,0.84)" }}>{status}</Typography>

                <Stack direction={{ xs: "column", sm: "row", md: "column", lg: "row" }} spacing={1.5}>
                  <Button variant="contained" size="large" onClick={startGame} startIcon={<Replay />}>
                    {sequence.length === 0 || isGameOver ? "Start Game" : "Restart"}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={isMuted ? <VolumeOff /> : <VolumeUp />}
                    onClick={() => setIsMuted((current) => !current)}
                  >
                    {isMuted ? "Sound off" : isShowingSequence ? "Sequence playing" : "Sound on"}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 5 }}>
            <CardContent>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Repeat the sequence
                  </Typography>
                  <Typography color="text.secondary">Click the pads in the same order they light up.</Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "repeat(2, minmax(120px, 1fr))", md: "repeat(2, minmax(180px, 1fr))" },
                    gap: 2,
                  }}
                >
                  {padConfigs.map((pad, index) => {
                    const isActive = activePad === index;

                    return (
                      <Button
                        key={pad.label}
                        onClick={() => void handlePadPress(index)}
                        disabled={isShowingSequence || sequence.length === 0 || isGameOver}
                        sx={{
                          minHeight: { xs: 140, md: 180 },
                          borderRadius: 5,
                          color: "#fff",
                          fontSize: { xs: "1rem", md: "1.2rem" },
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          background: isActive
                            ? `radial-gradient(circle at center, ${pad.glow} 0%, ${pad.color} 70%)`
                            : `linear-gradient(155deg, ${pad.color} 0%, rgba(20,20,20,0.2) 100%), ${pad.color}`,
                          boxShadow: isActive
                            ? `0 0 0 4px rgba(255,255,255,0.5), 0 0 40px ${pad.glow}`
                            : `0 18px 34px ${pad.glow}`,
                          transition: "transform 120ms ease, box-shadow 120ms ease, filter 120ms ease",
                          filter: isShowingSequence && !isActive ? "saturate(0.82) brightness(0.9)" : "none",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: `0 22px 38px ${pad.glow}`,
                          },
                          "&.Mui-disabled": {
                            color: "rgba(255,255,255,0.92)",
                          },
                        }}
                      >
                        {pad.label}
                      </Button>
                    );
                  })}
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default SimonSaysPage;
