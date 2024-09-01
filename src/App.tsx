import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Episode } from "./pages/episode/episode";
import { Season } from "./pages/season/season";
import "./App.scss";
import { Breadcrumbs } from "./components/breadcrumbs/breadcrumbs";
import axios from "axios";
import { useState, useEffect } from "react";
import { Loader } from "./components/loader/loader";

export function App() {
  const [files, setFiles] = useState();

  useEffect(() => {
    if (!files) {
      const fetchFiles = async () => {
        const response = await axios.get(
          "https://archive.org/metadata/doctor-who_202210/files"
        );
        const mp4Files = response.data.result.filter(
          ({ name }: { name: string }) => name.endsWith(".mp4")
        );
        console.log("here");
        setFiles(mp4Files);
      };

      fetchFiles();
    }
  }, []);

  return (
    <div className="app">
      <Link to="/">
        <img src="/images/logo.png" className="home-logo" />
      </Link>
      <Breadcrumbs />
      {files == null ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="" element={<Home files={files} />} />
          <Route path="/:season" element={<Season files={files} />} />
          <Route path="/:season/:id" element={<Episode files={files} />} />
        </Routes>
      )}
    </div>
  );
}
