import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from './styles';
import GlobalStyle from '../../assets/styles/global';
import Header from '../Header';
import defaultTheme from '../../assets/styles/themes/default';
import Routes from '../../routes';
import { AuthContext, AuthProvider } from '../../Context/AuthContext';

const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={defaultTheme}>
          <ToastContainer />
          <GlobalStyle />
          <Container>
            <Header />
            <Routes />
          </Container>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
