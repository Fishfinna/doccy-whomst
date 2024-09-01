import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { episode } from "../../types/episode";
import LinkBlock from "../../components/link-block/link-block";

export function Season(params: { files: any }) {
  const { season } = useParams();
  const [episodes, setEpisodes] = useState<episode[]>([]);

  useEffect(() => {
    async function fetchEpisodes() {
      const filteredEpisodes = [];
      for (const result of params.files) {
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
      <h1>{season?.replace("S", "SEASON ")}</h1>
      {episodes.map(({ name }) => {
        const episodeMatch = name.match(/^S\d+E(\d+)\s+-\s+(.*)\.mp4$/i);
        if (episodeMatch) {
          const episodeNumber = episodeMatch[1];
          const episodeTitle = episodeMatch[2];
          return (
            <div key={name}>
              <LinkBlock
                name={`Episode ${episodeNumber} - ${episodeTitle}`}
                href={`./${season}/${name}`}
              />
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
