import { useContext } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Module from './pages/Module';
import EditModule from './pages/EditModule';
import CreateModule from './pages/CreateModule';
import CreateClass from './pages/CreateClass';
import EditClass from './pages/EditClass';
import { AuthContext } from './Context/AuthContext';
import SignUp from './pages/SignUp';

function CustomRoute({ isPrivate, isSessionRoute, ...rest }) {
  const { authenticated, loading, isAdmin } = useContext(AuthContext);
  const history = useHistory();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isSessionRoute && authenticated) {
    history.push('/');
  }

  if (isPrivate && !isAdmin) {
    history.push('/');
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/" component={Home} />
      <CustomRoute exact isPrivate path="/modules/new" component={CreateModule} />
      <CustomRoute exact isPrivate path="/classes/new" component={CreateClass} />
      <CustomRoute exact path="/modules/:id" component={Module} />
      <CustomRoute exact isSessionRoute path="/login" component={Login} />
      <CustomRoute exact isSessionRoute path="/register" component={SignUp} />
      <CustomRoute exact isPrivate path="/modules/edit/:id" component={EditModule} />
      <CustomRoute exact isPrivate path="/classes/edit/:id" component={EditClass} />
    </Switch>
  );
}
