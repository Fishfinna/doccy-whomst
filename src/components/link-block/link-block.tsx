import "./link-block.scss";

export default function LinkBlock(props: { name: string; href: string }) {
  return (
    <div className="link-block-container">
      <a href={props.href}>{props.name}</a>
    </div>
  );
}
