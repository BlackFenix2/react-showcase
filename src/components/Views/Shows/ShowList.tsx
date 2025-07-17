import * as React from "react";
import { Grid } from "@mui/material";
import { Movie } from "@/services/API/moviesAPI";
import ShowCard from "./ShowCard";

const ShowList = (props: any) => (
  <div>
    <Grid container spacing={3}>
      {Object.values(props.shows).map((show: Movie) => (
        <Grid size={{ sm: 4, md: 3, lg: 3 }} key={show.id}>
          <ShowCard movie={show} key={show.id} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default ShowList;
