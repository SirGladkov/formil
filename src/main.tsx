import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import SuccessPage from './SuccessPage';
import formReducer from './features/form/formSlice';
import './index.css';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;