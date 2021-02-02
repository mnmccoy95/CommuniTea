import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { Button } from "reactstrap";
import { PostContext } from "../providers/PostProvider"

const Search = () => {
  const { posts, getPostsByTagName } = useContext(PostContext);
  const [input, setInput] = useState("");
  const history = useHistory();

  const search = (evt) => {
    evt.preventDefault();

    if (input === "") {

    } else {
      getPostsByTagName(input)
    }
  };

  return (
    <form>
      <fieldset>
        <input type="text" required
          onChange={(event) => setInput(event.target.value)}
          value={input}
          placeholder="Search" />

        <Button type="submit" onClick={(e) => { search(e) }}>
          Search
        </Button>
      </fieldset>
    </form>
  )
};

export default Search;
