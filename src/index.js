import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Confetti from 'react-confetti';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      numberOfPieces={200} // Adjust the number of confetti pieces
      recycle={false} // Set to true to keep confetti on the screen
    />
  </React.StrictMode>
);

reportWebVitals();
