import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import Hero from "./components/main/Hero";
import MixedMedia from "./components/main/MixedMedia";
import AbstractPaintings from "./components/main/AbstractPaintings";
import Portraits from "./components/main/Portraits";
import CharcoalDrawings from "./components/main/CharcoalDrawings";
import NavBar from './components/main/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/mixed-media" element={<MixedMedia />} />
        <Route path="/abstract-paintings" element={<AbstractPaintings />} />
        <Route path="/portraits" element={<Portraits />} />
        <Route path="/charcoal-drawings" element={<CharcoalDrawings />} />
        <Route path="/" element={<Hero />} />
      </Routes>
    </Router>
  );
}

export default App;