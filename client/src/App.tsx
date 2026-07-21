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
