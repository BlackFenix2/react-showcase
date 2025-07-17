"use client";

import showStore from "@/state/stores/showStore";
import React from "react";
import { css } from "@emotion/css";
import { observer } from "mobx-react-lite";
import Link from "next/link";

// Image equalizer

const imgStyle = css`
  width: 300px;
  height: 400px;
`;

const Details = (props) => {
  const ShowStore = React.useContext(showStore);

  const show = ShowStore.shows.find(
    (value) => value.id.toString() === props.params.id
  );

  return (
    show && (
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt="where is the item"
          className={imgStyle}
        />
        <h1>{show.name || show.title}</h1>
        <p>{show.overview}</p>
        <Link href="/shows">Go Back</Link>
      </div>
    )
  );
};

export default observer(Details);
