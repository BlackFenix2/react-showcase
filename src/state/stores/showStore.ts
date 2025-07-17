"use client";
import { autorun, observable, action, makeAutoObservable } from "mobx";
import { createContext } from "react";
import { Movie, moviesAPI } from "@/services/API/moviesAPI";

class ShowStore {
  searchTerm = "";

  shows: Movie[] = [];

  unfilteredShows: Movie[] = [];

  fetchMovies = async () => {
    this.unfilteredShows = (await moviesAPI.getMoviesList()).results;

    this.shows = this.unfilteredShows;
  };

  constructor() {
    makeAutoObservable(this);
    this.fetchMovies();
  }

  // delay like debounce
  idle = true;

  searchMovies = autorun(
    () => {
      this.shows = this.unfilteredShows.filter(
        (value) =>
          (value.title &&
            value.title.toUpperCase().match(this.searchTerm.toUpperCase())) ||
          (value.name &&
            value.name.toUpperCase().match(this.searchTerm.toUpperCase())) ||
          value.overview.toUpperCase().match(this.searchTerm.toUpperCase())
      );
    },
    {
      delay: 500,
    }
  );
}

export default createContext(new ShowStore());
