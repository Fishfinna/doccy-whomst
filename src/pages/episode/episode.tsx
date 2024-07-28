import { useParams } from "react-router";

export function Episode() {
  const { id } = useParams();
  const baseUrl = "https://archive.org/0/items/doctor-who_202210/";
  const episodeName = id
    ?.replace(/^S\d+E\d+\s+-\s+/i, "")
    .replace(/\.[^/.]+$/, "");

  return (
    <>
      <h1>{episodeName}</h1>

      {id?.endsWith(".mp4") ? (
        <video width="320" height="240" controls={true}>
          <source src={baseUrl + id} />
        </video>
      ) : null}
    </>
  );
}
