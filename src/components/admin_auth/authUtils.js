import Cookies from 'js-cookie';

export const checkAuth = () => {
  const authToken = Cookies.get('auth_token');
  const userRole = Cookies.get('user_role');
  return {
    isAuthenticated: authToken === 'admin_authenticated',
    role: userRole || ''
  };
};

export const clearAuth = () => {
  // Remove with path specification
  Cookies.remove('auth_token', { path: '/' });
  Cookies.remove('user_role', { path: '/' });
  
  // Force remove with all possible paths
  Cookies.remove('auth_token', { path: '' });
  Cookies.remove('user_role', { path: '' });
  
  // Remove with additional options
  const options = {
    path: '/',
    domain: window.location.hostname,
    secure: window.location.protocol === 'https:',
    sameSite: 'strict'
  };
  
  Cookies.remove('auth_token', options);
  Cookies.remove('user_role', options);
  
  // Clear any other potential variations
  document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  document.cookie = 'user_role=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
};