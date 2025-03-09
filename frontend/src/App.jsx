import React from 'react';
import AppRoutes from './routes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './App.css';

const App = () => (
  <div className="app-container">
    <Navbar />
    <AppRoutes />
    <Footer />
  </div>
);

export default App;

