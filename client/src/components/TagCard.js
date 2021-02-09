import React, { useContext } from "react"
import { StyleContext } from "../providers/StyleProvider"
import { PostContext } from "../providers/PostProvider"

const TagCard = ({ tag }) => {
  const { style } = useContext(StyleContext);
  const { getPostsByTagName } = useContext(PostContext);

  return (
    <div className={`tagCard${style.child} btn`} onClick={(e) => { getPostsByTagName(tag.name) }}>{tag.name}</div>
  )
}

export default TagCard;