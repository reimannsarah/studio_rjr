import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Hero from "./components/main/Hero";
import Layout from './components/main/Layout';
import Art from './components/main/Art';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="/:route" element={<Art />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;