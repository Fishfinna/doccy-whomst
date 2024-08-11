import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Episode } from "./pages/episode/episode";
import { Season } from "./pages/season/season";
import "./App.scss";

export function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/:season" element={<Season />}></Route>
        <Route path="/:season/:id" element={<Episode />} />
      </Routes>
    </div>
  );
}
