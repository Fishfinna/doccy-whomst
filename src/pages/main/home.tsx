import axios from "axios";
import { useEffect, useState } from "react";

export function Home() {
  const [episodes, setEpisodes] = useState<File[]>([]);

  useEffect(() => {
    async function fetchEpisodes() {
      const response = await axios.get(
        "https://archive.org/metadata/doctor-who_202210/files"
      );
      setEpisodes(response.data.result);
    }

    fetchEpisodes();
  }, []);

  return <p>{JSON.stringify(episodes[0])}</p>;
}
