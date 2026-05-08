// Track page views
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-82604QSNWB', {
      page_path: path,
      page_title: document.title
    });
  }
};

// Track user details if logged in with Google
export const trackUserVisit = (userDetails) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_visit', {
      user_id: userDetails?.uid,
      email: userDetails?.email,
      name: userDetails?.displayName,
      visit_time: new Date().toISOString()
    });
  }
};