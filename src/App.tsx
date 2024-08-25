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
      setFiles(
        await axios.get("https://archive.org/metadata/doctor-who_202210/files")
      );
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
          <Route path="/:season" element={<Season />}></Route>
          <Route path="/:season/:id" element={<Episode />} />
        </Routes>
      )}
    </div>
  );
}
