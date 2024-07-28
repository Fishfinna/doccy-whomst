import { useParams } from "react-router";

export function Episode() {
  const { id } = useParams();
  const baseUrl = "https://archive.org/0/items/doctor-who_202210/";

  return (
    <>
      <h1>episode</h1>

      <video>
        <source src={baseUrl + id?.replaceAll(" ", "%20")} />
      </video>
      <a href={baseUrl + id?.replaceAll(" ", "%20")}>
        {baseUrl + id?.replaceAll(" ", "%20")}
      </a>
    </>
  );
}
