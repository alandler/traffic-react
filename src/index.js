import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App.js";

// import'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <div>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
  <App />
  </div>,
  document.getElementById('root')
);