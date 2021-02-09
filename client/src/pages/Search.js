import React, { useContext, useState } from "react";
import { Button } from "reactstrap";
import { PostContext } from "../providers/PostProvider"
import { StyleContext } from "../providers/StyleProvider"

const Search = () => {
  const { getPostsByTagName, getAllPosts } = useContext(PostContext);
  const { style } = useContext(StyleContext);
  const [input, setInput] = useState("");

  const search = (evt) => {
    evt.preventDefault();

    if (input === "") {
      getAllPosts()
    } else {
      getPostsByTagName(input)
    }
  };

  return (
    <form>
      <fieldset className="searchForm">
        <input type="text" required
          className="searchBar"
          onChange={(event) => setInput(event.target.value)}
          value={input}
          placeholder="Search" />

        <Button className={`dangerBtn${style.child}`} type="submit" onClick={(e) => { search(e) }}>
          Search
        </Button>
      </fieldset>
    </form>
  )
};

export default Search;
