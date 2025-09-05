import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Navbar } from './components/NavbarSS';
import { Hero } from './components/HeroSS';
import { About } from './components/AboutSS';
import { Projects } from './components/ProjectsSS';
import { Contact } from './components/ContactSS';
import { TechStack } from './components/TechStack';
import { RGBDivider } from './components/RGBDivider';
import { UploadProject } from './components/UploadProject';
import { LoginForm } from './components/auth/LoginForm';
import { checkAuth, clearAuth } from './components/auth/authUtils';
import { trackPageView } from './utils/analytics';
import { Footer } from './components/Footer.jsx';
import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './App.css';

// Add GA4 script to head
const addGA4Script = () => {
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID);
};

function App() {
  useEffect(() => {
    addGA4Script();
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router basename="/portfolio-website">
        <AppContent />
      </Router>
    </GoogleOAuthProvider>
  );
}

function AppContent() {
  const [projects, setProjects] = useState([]);
  const [firebaseProjects, setFirebaseProjects] = useState([]);
  const [user, setUser] = useState(() => {
    const auth = checkAuth();
    return {
      isLoggedIn: auth.isAuthenticated,
      role: auth.role
    };
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Function to fetch projects from Firebase
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFirebaseProjects(projectsData);
      console.log("Projects loaded from Firebase:", projectsData.length);
    } catch (error) {
      console.error("Error loading projects from Firebase:", error);
      
      // Show specific error message for permissions issues
      if (error.code === 'permission-denied') {
        console.error("Firebase permissions error: Make sure Firestore rules allow public read access");
      } else if (error.code === 'unavailable') {
        console.error("Firebase service unavailable: Check your internet connection");
      } else {
        console.error("Firebase error details:", error.message);
      }
    }
  };

  // Fetch projects on initial load
  useEffect(() => {
    fetchProjects();
  }, []);

  // Track page views
  useEffect(() => {
    trackPageView();
  }, [location.pathname]);

  const handleLogin = () => {
    const auth = checkAuth();
    setUser({ 
      isLoggedIn: auth.isAuthenticated, 
      role: auth.role 
    });
  };
  
  const handleLogout = () => {
    clearAuth();
    setUser({ isLoggedIn: false, role: '' });
    navigate('/');
  };
  
  const handleAddProject = (projectOrProjects, isDeleteUpdate = false) => {
    if (isDeleteUpdate) {
      setProjects(projectOrProjects);
    } else {
      setProjects(prev => {
        const exists = prev.some(p => 
          p.title === projectOrProjects.title && 
          p.desc === projectOrProjects.desc
        );
        
        if (exists) return prev;
        return [...prev, projectOrProjects];
      });
    }
    
    // Refresh Firebase projects
    fetchProjects();
  };

  // Routes where we don't want to show the navbar
  const hideNavRoutes = ['/login', '/UploadProject']; 

  // Check if current path should hide navbar
  const shouldHideNavbar = hideNavRoutes.some(route => 
    location.pathname.endsWith(route)
  );

  return (
    <>
      {!shouldHideNavbar && (
        <Navbar
          isLoggedIn={user.isLoggedIn}
          role={user.role}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <RGBDivider />
              <About />
              <RGBDivider />
              <TechStack />
              <RGBDivider />
              <Projects addedProjects={firebaseProjects} />
              <RGBDivider />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route
          path="/login"
          element={
            user.isLoggedIn && user.role === 'Admin' ? (
              <Navigate to="/UploadProject" replace />
            ) : (
              <LoginForm onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/UploadProject"
          element={
            user.isLoggedIn && user.role === 'Admin' ? (
              <UploadProject 
                onAddProject={handleAddProject} 
                isAdmin={true}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;