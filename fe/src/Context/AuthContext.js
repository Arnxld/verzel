import { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
      const isUserAdmin = JSON.parse(atob(token.split('.')[1])).is_admin;
      setIsAdmin(isUserAdmin);
    }

    setLoading(false);
  }, []);

  const history = useHistory();

  async function handleLogin({ username, password }) {
    const { data } = await api.post('/login', { username, password });

    const { token, user } = data;

    localStorage.setItem('token', JSON.stringify(token));

    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (user.is_admin) {
      setIsAdmin(true);
    }

    setAuthenticated(true);

    history.push('/');

    toast.success('Seja bem vindo!');
  }

  async function handleLogout() {
    setAuthenticated(false);
    setIsAdmin(false);

    localStorage.removeItem('token');

    api.defaults.headers.Authorization = undefined;

    history.push('/login');
  }

  return (
    <AuthContext.Provider value={{
      authenticated, handleLogin, handleLogout, loading, isAdmin,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
