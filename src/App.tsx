import "./styles/apps.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TicTacToe from "./pages/TicTacToe";
import TicTacToe2 from "./pages/TicTacToe2";
import LayoutOutlet from "./components/LayoutOutlet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutOutlet />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/classic" element={<TicTacToe />} />
          <Route path="/enhanced" element={<TicTacToe2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
