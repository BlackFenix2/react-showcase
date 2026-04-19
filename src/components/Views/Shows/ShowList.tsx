import * as React from "react";
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from "@mui/material";
import { Movie } from "@/services/API/moviesAPI";
import ShowCard from "./ShowCard";

interface Props {
  shows: Movie[];
  searchTerm?: string;
}

const ShowList: React.FC<Props> = (props) => {
  if (props.shows.length === 0) {
    return (
      <Card sx={{ borderRadius: 5, borderStyle: "dashed" }}>
        <CardContent sx={{ py: 8, textAlign: "center" }}>
          <Stack spacing={2} alignItems="center">
            <Chip label="No matches" color="warning" variant="outlined" />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Nothing matched that search.
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 420 }}>
              {props.searchTerm
                ? `Try a broader search than "${props.searchTerm}" or search by a word from the overview instead.`
                : "The trending feed has not returned any titles yet."}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {props.shows.map((show) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4, xl: 3 }} key={show.id}>
            <ShowCard movie={show} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ShowList;
