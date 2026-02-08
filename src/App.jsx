import {BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import { MoviesPage } from './pages/MoviesPage';
import { MoviesFormPage } from './pages/moviesformpage';
import { Navigation } from './components/navigation';


function App() {
  return (
    <BrowserRouter>
      <Navigation />  
      <Routes>
        <Route path="/" element={<Navigate to="/movies" />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/form" element={<MoviesFormPage />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
