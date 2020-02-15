import React from "react";

interface ButtonProps {
  tagName: "a" | "button";
}

function Button<P extends ButtonProps>({
  tagName: TagName,
  ...props
}: P & UnionToIntersection<JSX.IntrinsicElements[P["tagName"]]>) {
  return <TagName {...props} />;
}

const But = (
  <Button
    tagName={"a"}
    ref={(x: HTMLAnchorElement) => x.href.toLowerCase()} // 🎉
  />
);

export { But };
