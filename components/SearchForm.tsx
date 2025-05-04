import React from "react";
import Form from "next/form";

import { SearchIcon } from "lucide-react";
import ResetSearchButton from "./ResetSearchButton";
const SearchForm = ({query}:{query?:string}) => {

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input text-black"
        placeholder="Search for a Startup"
      />

      {query && <ResetSearchButton />}

      <button type="submit" className="search-btn">
       <SearchIcon className="size-5"/>
      </button>
    </Form>
  );
};

export default SearchForm;
