"use client";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { createContext } from "react";
import { Movie, moviesAPI } from "@/services/API/moviesAPI";

class ShowStore {
  searchTerm = "";

  shows: Movie[] = [];

  unfilteredShows: Movie[] = [];

  // delay like debounce
  idle = true;

  fetchMovies = async () => {
    const results = (await moviesAPI.getMoviesList()).results;

    runInAction(() => {
      this.unfilteredShows = results;
      this.applySearchFilter();
    });
  };

  setSearchTerm = (value: string) => {
    this.searchTerm = value;
  };

  applySearchFilter = () => {
    const normalizedSearch = this.searchTerm.trim().toUpperCase();

    if (!normalizedSearch) {
      this.shows = this.unfilteredShows;
      return;
    }

    this.shows = this.unfilteredShows.filter(
      (value) =>
        (value.title && value.title.toUpperCase().match(normalizedSearch)) ||
        (value.name && value.name.toUpperCase().match(normalizedSearch)) ||
        value.overview.toUpperCase().match(normalizedSearch),
    );
  };

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => [this.searchTerm, this.unfilteredShows],
      () => {
        this.applySearchFilter();
      },
      {
        delay: 500,
      },
    );
    this.fetchMovies();
  }
}

export default createContext(new ShowStore());
