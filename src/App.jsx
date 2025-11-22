import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import DailyTracker from './pages/DailyTracker';
import Progress from './pages/Progress';
import MyPlan from './pages/MyPlan';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import { StoreProvider } from './context/StoreContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={
              <PrivateRoute>
                <Onboarding />
              </PrivateRoute>
            } />
            <Route path="/" element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/tracker" element={
              <PrivateRoute>
                <Layout>
                  <DailyTracker />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/progress" element={
              <PrivateRoute>
                <Layout>
                  <Progress />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/plan" element={
              <PrivateRoute>
                <Layout>
                  <MyPlan />
                </Layout>
              </PrivateRoute>
            } />
            <Route path="/reports" element={
              <PrivateRoute>
                <Layout>
                  <Reports />
                </Layout>
              </PrivateRoute>
            } />
          </Routes>
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
