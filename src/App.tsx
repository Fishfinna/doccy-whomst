import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/main/home";
import { Episode } from "./pages/episode/episode";
import { Season } from "./pages/season/season";

export function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/:season" element={<Season />}></Route>
      <Route path="/:season/:id" element={<Episode />} />
    </Routes>
  );
}
