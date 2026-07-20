import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';

import Footer from './components/Footer';
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Loading from './pages/Loading';
import MyGeneration from './pages/MyGeneration';
import Community from './pages/Community';
import Results from './pages/Results';
import Plans from './pages/Plans';

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Generator />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/my-generation" element={<MyGeneration />} />
            <Route path="/community" element={<Community />} />
            <Route path="/plan" element={<Plans />} />
            <Route path="/results/:projectId" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
