import { useParams, url } from "react-router";
import { useEffect } from "react";
import "./episode.scss";
import LinkBlock from "../../components/link-block/link-block";

export function Episode(params: { files: any }) {
  const { id } = useParams();
  const baseUrl = "https://archive.org/0/items/doctor-who_202210/";
  const episodeName = id
    ?.replace(/^S\d+E\d+\s+-\s+/i, "")
    .replace(/\.[^/.]+$/, "");
  const match = id?.match(/S(\d+)E(\d+)/);
  const episodeIndex = params.files.indexOf(
    params.files.find(({ name }: { name: string }) => id == name)
  );
  const nextEpisode = params.files[episodeIndex + 1];
  const nextEpisodeNames = nextEpisode?.name.match(
    /^S\d+E(\d+)\s+-\s+(.*)\.mp4$/i
  );
  const previousEpisode = params.files[episodeIndex - 1];
  const previousEpisodeNames = previousEpisode?.name.match(
    /^S\d+E(\d+)\s+-\s+(.*)\.mp4$/i
  );

  let formattedEpisodeNumber: string = "";
  if (match) {
    const season = parseInt(match[1], 10);
    const episode = parseInt(match[2], 10);
    formattedEpisodeNumber = `Season ${season}: Episode ${episode}`;
  }

  useEffect(() => {
    async function storeEpisode() {
      sessionStorage.setItem(
        "lastWatched",
        JSON.stringify({
          name: formattedEpisodeNumber,
          url: window.location.pathname,
        })
      );
    }

    return () => {
      storeEpisode(); //TODO: set this up to read on the front page
    };
  }, []);

  return (
    <div className="episode-container">
      <h1>{episodeName}</h1>
      <h2>{formattedEpisodeNumber}</h2>

      {id?.endsWith(".mp4") ? (
        <video width="320" height="240" controls={true}>
          <source src={baseUrl + id} />
        </video>
      ) : null}
      <div className="navigation-buttons">
        {episodeIndex > 0 ? (
          <LinkBlock
            name={`Previous: ${previousEpisodeNames[2]}
              `}
            href={`./${previousEpisode.name}`}
          />
        ) : null}
        {episodeIndex != params.files.length - 1 ? (
          <LinkBlock
            name={`Next: ${nextEpisodeNames[2]}`}
            href={`./${nextEpisode.name}`}
          />
        ) : null}
      </div>
    </div>
  );
}
