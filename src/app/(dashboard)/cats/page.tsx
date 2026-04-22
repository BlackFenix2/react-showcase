"use client";
import * as React from "react";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Casino, Pets, TravelExplore } from "@mui/icons-material";
import { Form } from "informed";
import { css } from "@emotion/css";
import PageContainer from "@/components/layout/PageContainer";

const catImage = css`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 24px;
  box-shadow: 0 20px 48px rgba(17, 36, 60, 0.18);

  @media screen and (min-width: 767px) {
    width: 100%;
    height: auto;
  }
`;

// generate a random http status code between 100 and 599
const getRandomStatusCode = () => {
  return Math.floor(Math.random() * (599 - 100 + 1)) + 100;
};

const Cats: React.FC<any> = () => {
  const [result, setResult] = React.useState(200);
  const [number, setNumber] = React.useState(200);

  const onChangeEvent: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setResult(Number(event.target.value));
  };

  const onSubmitEvent = () => {
    if (!result) {
      const code = getRandomStatusCode();
      setResult(code);
      setNumber(code);
    } else {
      setNumber(result);
      // reset the result to 200 after submitting
      setResult(result);
    }
  };

  const onSubmitEventRandom = () => {
    const code = getRandomStatusCode();
    setResult(code);
    setNumber(code);
  };

  return (
    <PageContainer title="HTTP Cats">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 5,
              color: "#11243c",
              background:
                "linear-gradient(150deg, rgba(255,210,120,0.98) 0%, rgba(255,164,91,0.98) 46%, rgba(255,123,103,0.98) 100%)",
              boxShadow: "0 26px 60px rgba(173, 83, 32, 0.2)",
            }}
          >
            <CardContent>
              <Stack spacing={2.5}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Pets />
                  <Typography variant="overline" sx={{ letterSpacing: "0.18em" }}>
                    ERROR CODES, BUT FURRIER
                  </Typography>
                </Stack>

                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.05 }}>
                    Turn any HTTP status into a judgmental cat poster.
                  </Typography>
                  <Typography sx={{ mt: 1.5, opacity: 0.82 }}>
                    Enter a status code if you know what you want, or let chaos choose one for you.
                  </Typography>
                </Box>

                <Form onSubmit={onSubmitEvent}>
                  <Stack spacing={1.5}>
                    <TextField
                      fullWidth
                      type="number"
                      slotProps={{
                        htmlInput: { min: 100, max: 599 },
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <TravelExplore color="primary" />
                            </InputAdornment>
                          ),
                        },
                      }}
                      placeholder="200, 404, 418..."
                      label="HTTP Status Code"
                      value={result}
                      onChange={onChangeEvent}
                      helperText="Valid range: 100 to 599"
                      sx={{
                        "& .MuiInputLabel-root": {
                          color: "rgba(17,36,60,0.72)",
                        },
                        "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink": {
                          color: "#11243c",
                          backgroundColor: "rgba(255,255,255,0.96)",
                          px: 0.75,
                          borderRadius: 1,
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 3,
                          backgroundColor: "rgba(255,255,255,0.88)",
                        },
                        "& .MuiFormHelperText-root": {
                          color: "rgba(17,36,60,0.82)",
                        },
                      }}
                    />

                    <Stack direction={{ xs: "column", sm: "row", md: "column", lg: "row" }} spacing={1.5}>
                      <Button type="submit" variant="contained" size="large">
                        Show me a cat
                      </Button>
                      <Button variant="outlined" size="large" startIcon={<Casino />} onClick={onSubmitEventRandom}>
                        Surprise me
                      </Button>
                    </Stack>
                  </Stack>
                </Form>

                <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                  <Chip label={`Current code: ${number}`} sx={{ bgcolor: "rgba(255,255,255,0.7)" }} />
                  <Chip
                    label={number >= 400 ? "Something broke" : "Mostly harmless"}
                    sx={{ bgcolor: "rgba(255,255,255,0.7)" }}
                  />
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ borderRadius: 5, overflow: "hidden" }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Status {number}
                  </Typography>
                  <Typography color="text.secondary">
                    A visual reminder that the internet has moods and most of them are cats.
                  </Typography>
                </Box>

                <Divider />

                <Box>
                  <Box
                    component="img"
                    src={`https://http.cat/${number}.jpg`}
                    alt={`HTTP status ${number} cat`}
                    className={catImage}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Cats;
