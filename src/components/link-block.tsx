export default function LinkBlock(props: { name: string; href: string }) {
  return (
    <>
      <a href={props.href}>{props.name}</a>
    </>
  );
}
