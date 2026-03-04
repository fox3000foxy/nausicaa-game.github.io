import {
    BrowserRouter,
    Route,
    Routes
} from 'react-router-dom';
import Demo from './pages/Demo';
import Game from './pages/Game';
import HomePage from './pages/Home';
import MenuPage from './pages/Menu';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/app" element={<Game />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
