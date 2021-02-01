import React from "react"
import TagCard from "./TagCard"

const TagList = ({ tags }) => {

  return (
    <div>
      {tags.map((tag) => (
        <div key={tag.id}>
          <TagCard tag={tag.tag} />
        </div>
      ))}
    </div>
  );
}

export default TagList;