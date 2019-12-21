

interface ButtonProps {
  tagName: 'a' | 'button';
}

function Button<P extends ButtonProps>({
  tagName: TagName,
  ...props
}: P & UnionToIntersection<JSX.IntrinsicElements[P['tagName']]>) {
  return <TagName {...props} />;
}

<Button
  tagName={'button'}
  ref={(x: HTMLButtonElement) => x.href.toLowerCase()} // 🎉
/>;
