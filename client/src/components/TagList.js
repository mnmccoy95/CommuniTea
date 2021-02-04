import React from "react"
import TagCard from "./TagCard"

const TagList = ({ tags }) => {

  return (
    <div className="tagList">
      {tags.map((tag) => (
        <div key={tag.id}>
          <TagCard tag={tag.tag} />
        </div>
      ))}
    </div>
  );
}

export default TagList;