import React from "react"

const TagCard = ({ tag }) => {
  return (
    <div class="tagCard btn">{tag.name}</div>
  )
}

export default TagCard;