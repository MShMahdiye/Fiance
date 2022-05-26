import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import CustomApolloProvider from './ProProvider';

ReactDOM.render(
  <React.StrictMode>
     <BrowserRouter>
      <CustomApolloProvider>
        <App />
      </CustomApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
