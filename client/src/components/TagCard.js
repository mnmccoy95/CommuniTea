import React from "react"

const TagCard = ({ tag }) => {
  return (
    <div className="tagCard btn">{tag.name}</div>
  )
}

export default TagCard;