import axios from "axios";
import { useEffect, useState } from "react";
import LinkBlock from "../../components/link-block/link-block";

export function Home() {
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
    <>
      <h1>Doctor Who</h1>
      <div>
        {seasons.map((season) => (
          <div key={season}>
            <LinkBlock
              name={season?.replace("S", "Season ")}
              href={`./${season}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
