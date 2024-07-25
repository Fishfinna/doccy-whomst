import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/main/home";
import { Episode } from "./pages/episode/episode";

export function App() {
  return (
    <Routes>
      <Route path="" element={<Home />} />
      <Route path="/episode" element={<Episode />} />
    </Routes>
  );
}
