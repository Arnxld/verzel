import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import logo from '../../assets/images/logo_verzel.svg';
import { AuthContext } from '../../Context/AuthContext';

export default function Header() {
  const { authenticated, handleLogout, isAdmin } = useContext(AuthContext);

  return (
    <Container>
      <img src={logo} alt="Logo Verzel" />
      <nav>
        <Link to="/">Módulos</Link>

        { isAdmin && <Link to="/classes/new">Nova aula</Link>}

        {authenticated ? (
          <button type="button" onClick={handleLogout} className="auth-button">Sair</button>
        ) : (
          <Link to="/login" className="auth-button">Entrar</Link>
        )}

      </nav>
    </Container>
  );
}
