import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { episode } from "../../types/episode";
import axios from "axios";

export function Season() {
  const { season } = useParams();
  const [episodes, setEpisodes] = useState<episode[]>([]);

  useEffect(() => {
    async function fetchEpisodes() {
      const response = await axios.get(
        "https://archive.org/metadata/doctor-who_202210/files"
      );

      const results = response.data.result;
      const filteredEpisodes = [];
      for (const result of results) {
        if (result.name.startsWith(season)) {
          filteredEpisodes.push(result);
        }
      }

      setEpisodes(filteredEpisodes);
    }

    fetchEpisodes();
  }, [season]);

  return (
    <>
      <div>
        <a></a>
      </div>
      <p>{season?.replace("S", "SEASON ")}</p>
      {episodes.map(({ name }) => {
        if (name.endsWith(".mp4")) {
          const episodeMatch = name.match(/^S\d+E(\d+)\s+-\s+(.*)\.mp4$/i);
          if (episodeMatch) {
            const episodeNumber = episodeMatch[1];
            const episodeTitle = episodeMatch[2];
            return (
              <div key={name}>
                <a href={`./${season}/${name}`}>
                  Episode {episodeNumber} - {episodeTitle}
                </a>
              </div>
            );
          }
        }
        return null;
      })}
    </>
  );
}
