import axios from "axios";
import { useEffect, useState } from "react";
import { File } from "../../types/files";

export function Home() {
  const [episodes, setEpisodes] = useState<File[]>([]);
  const [seasons, setSeasons] = useState<string[]>([]);

  useEffect(() => {
    async function fetchEpisodes() {
      const response = await axios.get(
        "https://archive.org/metadata/doctor-who_202210/files"
      );
      const results = response.data.result;
      const seasons = results.map((result: File) => {
        const match = result.name.match(/^S\d+/i);
        return match ? match[0] : null;
      });

      setSeasons([...new Set(seasons as string[])]);
    }

    fetchEpisodes();
  }, []);

  return (
    <div>
      {seasons.map((season) => (
        <div>
          <a href={`./${season}`}>{season?.replace("S", "Season ")}</a>
        </div>
      ))}
      {/* {episodes.map(({ url, displayName }) => {
        if (url.endsWith(".mp4")) {
          return (
            <div>
              <a href={`./episode/${url}`}>{displayName}</a>
            </div>
          );
        }
      })} */}
    </div>
  );
}
