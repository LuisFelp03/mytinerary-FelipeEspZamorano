// src/App.js
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import CitiesPage from './components/CitiesPage';
import CityDetails from './components/CityDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
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
      </Router>
    </Provider>
  );
}

export default App;
