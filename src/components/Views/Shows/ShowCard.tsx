import {
  Avatar,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Button,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowOutward, CalendarToday, Star } from "@mui/icons-material";
import React from "react";
import { Movie } from "@/services/API/moviesAPI";
import moment from "moment";
import Link from "next/link";

type Props = {
  movie: Movie;
};

const ShowCard: React.FC<Props> = ({ movie }) => {
  const { first_air_date, release_date } = movie;
  const parsedReleaseDate = moment(first_air_date || release_date, "YYYY-MM-DD").format("MM/DD/YYYY");

  const mediaType = movie.first_air_date == null ? "movie" : "tv";
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750/0d223a/f5efe2?text=Poster+Pending";
  const title = movie.name || movie.title;
  const releaseLabel = parsedReleaseDate === "Invalid date" ? "Release date pending" : parsedReleaseDate;
  const ratingValue = Math.max(0, Math.min(10, movie.vote_average ?? 0));

  return (
    <Card
      raised
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 4,
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(247,245,240,1) 100%)",
        boxShadow: "0 18px 44px rgba(18, 35, 58, 0.12)",
        transition: "transform 180ms ease, box-shadow 180ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 24px 54px rgba(18, 35, 58, 0.2)",
        },
      }}
    >
      <CardActionArea component={Link} href={`/shows/${movie.id}`} sx={{ display: "block", flex: 1 }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            alt={`${title} poster`}
            image={posterUrl}
            sx={{ aspectRatio: "2 / 3", width: "100%" }}
          />
          <Chip
            label={mediaType === "movie" ? "Movie" : "Series"}
            size="small"
            sx={{
              position: "absolute",
              top: 14,
              left: 14,
              bgcolor: "rgba(9, 19, 31, 0.78)",
              color: "#fff",
              backdropFilter: "blur(6px)",
            }}
          />
        </Box>

        <CardContent sx={{ display: "flex", pb: 2 }}>
          <Stack spacing={1.5} sx={{ flex: 1, width: "100%" }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.15 }}>
                {title}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 0.75, color: "text.secondary", alignItems: "center" }}>
                <CalendarToday sx={{ fontSize: 15 }} />
                <Typography variant="body2">{releaseLabel}</Typography>
              </Stack>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                minHeight: "4.8em",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {movie.overview || "No overview provided yet."}
            </Typography>

            <Stack direction="row" spacing={1.25} sx={{ mt: "auto", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "rgba(255,193,92,0.22)", color: "#9a5c00", width: 36, height: 36 }}>
                <Star sx={{ fontSize: 18 }} />
              </Avatar>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {ratingValue.toFixed(1)} / 10 audience score
                </Typography>
                <Rating readOnly value={ratingValue} max={10} precision={0.5} size="small" />
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ px: 2, pb: 2, pt: 0, justifyContent: "space-between" }}>
        <Button component={Link} href={`/shows/${movie.id}`} variant="contained" size="small">
          View Details
        </Button>

        <Button
          component="a"
          href={`https://www.themoviedb.org/${mediaType}/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
          size="small"
          endIcon={<ArrowOutward />}
        >
          Open TMDB
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(ShowCard);
