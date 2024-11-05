import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import CitiesPage from './components/CitiesPage';
import CityDetails from './components/CityDetails';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/city/:id" element={<CityDetails />} />
      </Routes>
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;