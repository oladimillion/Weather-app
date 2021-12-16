import React from "react";
import { Icon } from "../Icon"

type Props = {
  marked: boolean;
  add(): void;
  remove(): void;
}

export const Bookmark = (props: Props) => {
  const { marked, add, remove, ...rest } = props

  const iconProps = React.useMemo(() => { 
    return marked
    ? { variant: "yellow-star", onClick: remove }
    : { variant: "grey-star", onClick: add }
  }, [marked])
  
  return (
    <Icon 
      {...rest}
      {...iconProps}
      icon="star" 
    />
  )
}

Bookmark.displayName = "Bookmark"

Bookmark.defaultProps = {
  marked: false,
}
