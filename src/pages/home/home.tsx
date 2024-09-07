/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import LinkBlock from "../../components/link-block/link-block";
import "./home.scss";

export function Home(params: { files: any }) {
  const [seasons, setSeasons] = useState<string[]>([]);

  useEffect(() => {
    async function fetchEpisodes() {
      const seasons = [
        ...new Set(
          params.files
            .map((result: File) => {
              const match = result.name.match(/^S\d+/i);
              return match ? match[0] : null;
            })
            .filter((name: string) => !!name) as string[]
        ),
      ];

      setSeasons(seasons);
    }

    fetchEpisodes();
  }, []);

  return (
    <>
      <div>
        <h3>you were last watching: </h3>
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
