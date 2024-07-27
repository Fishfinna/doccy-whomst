import { useParams } from "react-router";

export function Episode() {
  const { id } = useParams();
  return <p>episode {id}</p>;
}
