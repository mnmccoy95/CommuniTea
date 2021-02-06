import React, { useContext } from "react"
import { StyleContext } from "../providers/StyleProvider"

const TagCard = ({ tag }) => {
  const { style } = useContext(StyleContext);

  return (
    <div className={`tagCard${style.child} btn`}>{tag.name}</div>
  )
}

export default TagCard;