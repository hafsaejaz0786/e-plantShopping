import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <div>
      {!showProducts ? (
        <div className="landing-page">
          <h1>Welcome To Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <AboutUs />
          <button className="get-started-btn" onClick={() => setShowProducts(true)}>
            Get Started
          </button>
        </div>
      ) : (
        <ProductList onHomeClick={() => setShowProducts(false)} />
      )}
    </div>
  );
}

export default App;