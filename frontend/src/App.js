import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const isAuthenticated = false; // authentication logic here

  return (
    <Router>
      <Switch>
        {isAuthenticated ? (
          <Route path='/' component={Dashboard} />
        ) : (
          <Route path='/' component={Login} />
        )}
      </Switch>
    </Router>
  );
};

export default App;