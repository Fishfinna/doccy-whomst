import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Episode } from "./pages/episode/episode";
import { Season } from "./pages/season/season";
import "./App.scss";
import { Breadcrumbs } from "./components/breadcrumbs/breadcrumbs";
import { Loader } from "./components/loader/loader";

export function App() {
  const cachedEpisodes = "";

  return (
    <div className="app">
      <Link to="/">
        <img src="/images/logo.png" className="home-logo" />
      </Link>
      <Breadcrumbs />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/:season" element={<Season />}></Route>
        <Route path="/:season/:id" element={<Episode />} />
      </Routes>
    </div>
  );
}
