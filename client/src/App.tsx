import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';

import Footer from './components/Footer';
import { Routes , Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Generator from './pages/Generator';
import Loading from './pages/Loading';
import MyGeneration from './pages/MyGeneration';
import Community from './pages/Community';
import Results from './pages/Results';
import Plans from './pages/Plans';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import {Toaster} from 'react-hot-toast';
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a2e',
            color: '#ffffff',
            border: '1px solid #2a2a42',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff2d6f',
              secondary: '#ffffff',
            },
          },
        }}
      />
      <div className="min-h-screen">
        <Navbar />
        <main className="pt-16 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <Generator />
                </ProtectedRoute>
              }
            />
            <Route path="/loading" element={<Loading />} />
            <Route
              path="/my-generation"
              element={
                <ProtectedRoute>
                  <MyGeneration />
                </ProtectedRoute>
              }
            />
            <Route path="/community" element={<Community />} />
            <Route path="/plan" element={<Plans />} />
            <Route path="/results/:projectId" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
