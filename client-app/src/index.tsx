import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/styles.scss';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    /** Providing our store context to the application. */
    <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
    </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();