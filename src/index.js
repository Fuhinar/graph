import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем createRoot вместо render
import './index.css';
import PizzaGraphGame from './PizzaGraphGame';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PizzaGraphGame />
  </React.StrictMode>
);
