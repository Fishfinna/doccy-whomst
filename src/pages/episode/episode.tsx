import { useParams } from "react-router";

export function Episode() {
  const { id } = useParams();
  const baseUrl = "https://archive.org/0/items/doctor-who_202210/";
  const episodeName = id
    ?.replace(/^S\d+E\d+\s+-\s+/i, "")
    .replace(/\.[^/.]+$/, "");
  const match = id?.match(/S(\d+)E(\d+)/);
  let formattedEpisodeNumber;

  if (match) {
    const season = parseInt(match[1], 10);
    const episode = parseInt(match[2], 10);
    formattedEpisodeNumber = `Season ${season}: Episode ${episode}`;
  }

  return (
    <>
      <h1>{episodeName}</h1>
      <h2>{formattedEpisodeNumber}</h2>

      {id?.endsWith(".mp4") ? (
        <video width="320" height="240" controls={true}>
          <source src={baseUrl + id} />
        </video>
      ) : null}
    </>
  );
}
