import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function SecretRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Decode base64 path parameter
    const secretPath = location.hash.split('/').pop();
    const decodedPath = atob(secretPath);
    
    // Ganti dengan kode rahasia Anda
    if (decodedPath === 'CauseWannaGym') {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, []);

  return null;
}