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
  const [files, setFiles] = useState(null);

  useEffect(() => {
    async function fetchFiles() {
      const response = await axios.get(
        "https://archive.org/metadata/doctor-who_202210/files"
      );
      setFiles(response.data.result);
    }

    fetchFiles();
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
          <Route path="/:season" element={<Season files={files} />}></Route>
          <Route path="/:season/:id" element={<Episode files={files} />} />
        </Routes>
      )}
    </div>
  );
}
