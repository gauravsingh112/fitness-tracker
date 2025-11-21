import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DailyTracker from './pages/DailyTracker';
import MyPlan from './pages/MyPlan';
import Progress from './pages/Progress';

function App() {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="tracker" element={<DailyTracker />} />
            <Route path="plan" element={<MyPlan />} />
            <Route path="progress" element={<Progress />} />
          </Route>
        </Routes>
      </Router>
    </StoreProvider>
  );
}

export default App;
