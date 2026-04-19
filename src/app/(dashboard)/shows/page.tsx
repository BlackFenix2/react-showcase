"use client";
import React from "react";
import { observer } from "mobx-react-lite";
import showStore from "@/state/stores/showStore";
import ShowList from "@/components/Views/Shows/ShowList";
import PageContainer from "@/components/layout/PageContainer";
import { Box, Card, CardContent, Chip, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { AutoAwesome, LiveTv, LocalMovies, Search, Whatshot } from "@mui/icons-material";

const Shows = () => {
  const ShowStore = React.useContext(showStore);
  const searchTerm = ShowStore.searchTerm.trim();
  const totalResults = ShowStore.shows.length;
  const movieCount = ShowStore.shows.filter((item) => !item.first_air_date).length;
  const seriesCount = totalResults - movieCount;
  const featuredShow = ShowStore.shows[0];

  const setSearchTerm: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    ShowStore.setSearchTerm(event.target.value);
  };

  return (
    <PageContainer title="Trending Shows">
      <Stack spacing={3}>
        <Card
          sx={{
            overflow: "hidden",
            borderRadius: 5,
            color: "#f8f7f2",
            background:
              "radial-gradient(circle at top left, rgba(255,193,92,0.32), transparent 30%), linear-gradient(135deg, #11243c 0%, #18395f 52%, #09131f 100%)",
            boxShadow: "0 30px 80px rgba(8, 24, 44, 0.35)",
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={3} alignItems="end">
              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AutoAwesome sx={{ color: "#ffca6b" }} />
                    <Typography variant="overline" sx={{ letterSpacing: "0.22em", opacity: 0.8 }}>
                      CURATED FROM TODAY&apos;S TRENDING FEED
                    </Typography>
                  </Stack>

                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.05 }}>
                      Browse the titles people are actually watching right now.
                    </Typography>
                    <Typography sx={{ mt: 1.5, maxWidth: 640, color: "rgba(248,247,242,0.78)" }}>
                      Search across films and series, skim the strongest contenders, and jump straight to the details
                      that matter.
                    </Typography>
                  </Box>

                  <TextField
                    fullWidth
                    label="Search titles or overview"
                    value={ShowStore.searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Try fallout, black mirror, or sci-fi rebellion"
                    sx={{
                      maxWidth: 560,
                      "& .MuiInputLabel-root": {
                        color: "rgba(17,36,60,0.7)",
                      },
                      "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-root.MuiInputLabel-shrink": {
                        color: "#11243c",
                        backgroundColor: "rgba(255,255,255,0.98)",
                        px: 0.75,
                        borderRadius: 1,
                      },
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgba(255,255,255,0.92)",
                      },
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search color="primary" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip
                      icon={<Whatshot />}
                      label={`${totalResults} results`}
                      sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }}
                    />
                    <Chip
                      icon={<LocalMovies />}
                      label={`${movieCount} movies`}
                      sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }}
                    />
                    <Chip
                      icon={<LiveTv />}
                      label={`${seriesCount} series`}
                      sx={{ bgcolor: "rgba(255,255,255,0.12)", color: "inherit" }}
                    />
                    {searchTerm ? (
                      <Chip
                        label={`Filtered by "${searchTerm}"`}
                        sx={{ bgcolor: "rgba(255,202,107,0.18)", color: "inherit" }}
                      />
                    ) : null}
                  </Stack>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <Card
                  sx={{
                    borderRadius: 4,
                    height: "100%",
                    background: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))",
                    color: "inherit",
                    backdropFilter: "blur(14px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <CardContent>
                    <Typography variant="overline" sx={{ opacity: 0.72 }}>
                      Featured right now
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, mt: 1 }}>
                      {featuredShow?.name || featuredShow?.title || "Loading trending titles"}
                    </Typography>
                    <Typography sx={{ mt: 1.5, color: "rgba(248,247,242,0.74)" }}>
                      {featuredShow?.overview
                        ? `${featuredShow.overview.slice(0, 180)}${featuredShow.overview.length > 180 ? "..." : ""}`
                        : "The list updates after the feed loads, then this panel highlights the first result in the set."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <ShowList shows={ShowStore.shows} searchTerm={searchTerm} />
      </Stack>
    </PageContainer>
  );
};

export default observer(Shows);
