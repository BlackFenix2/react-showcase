"use client";
import React from "react";
import { observer } from "mobx-react-lite";
import showStore from "@/state/stores/showStore";
import ShowList from "@/components/Views/Shows/ShowList";
import { Search } from "@mui/icons-material";
import TextInput from "@/components/inputs";

const Shows = () => {
  const ShowStore = React.useContext(showStore);

  const setSearchTerm = (event) => {
    ShowStore.searchTerm = event.target.value;
  };

  return (
    <div>
      <h1>List of trending movies and shows</h1>
      <TextInput label="Search Shows" value={ShowStore.searchTerm} changeEvent={setSearchTerm} Icon={Search} />

      <ShowList shows={ShowStore.shows} />
    </div>
  );
};

export default observer(Shows);
