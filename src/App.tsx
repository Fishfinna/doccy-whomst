import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Episode } from "./pages/episode/episode";
import { Season } from "./pages/season/season";
import "./App.scss";
import { Breadcrumbs } from "./components/breadcrumbs/breadcrumbs";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader } from "./components/loader/loader";

export function App() {
  const [files, setFiles] = useState<any | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedFiles = sessionStorage.getItem("files");
    const storedTimestamp = sessionStorage.getItem("filesTimestamp");

    const fetchFiles = async () => {
      const response = await axios.get(
        "https://archive.org/metadata/doctor-who_202210/files"
      );
      const mp4Files = response.data.result.filter(
        ({ name }: { name: string }) =>
          name.endsWith(".mp4") && !name.includes(".ia")
      );
      console.log("Files fetched");
      setFiles(mp4Files);
      const timestamp = new Date().getTime();
      sessionStorage.setItem("files", JSON.stringify(mp4Files));
      sessionStorage.setItem("filesTimestamp", timestamp.toString());
    };

    const isOlderThanOneDay = (timestamp: string | null) => {
      if (!timestamp) return true;
      const oneDay = 24 * 60 * 60 * 1000;
      return new Date().getTime() - parseInt(timestamp, 10) > oneDay;
    };

    if (!storedFiles || isOlderThanOneDay(storedTimestamp)) {
      fetchFiles();
    } else {
      setFiles(JSON.parse(storedFiles));
    }
  }, [location.pathname]);

  return (
    <div className="app">
      <Link to="/">
        <img src="/images/logo.png" className="home-logo" alt="Home Logo" />
      </Link>
      <Breadcrumbs />
      {files == null ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home files={files} />} />
          <Route path="/:season" element={<Season files={files} />} />
          <Route path="/:season/:id" element={<Episode files={files} />} />
        </Routes>
      )}
    </div>
  );
}
