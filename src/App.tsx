import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TicTacToe from "./pages/TicTacToe";
import TicTacToe2 from "./pages/TicTacToe2";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/classic" element={<TicTacToe />} />
            <Route path="/enhanced" element={<TicTacToe2 />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
