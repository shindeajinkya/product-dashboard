import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/Auth';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path='/' component={Dashboard} />
          <Route path='/login' component={Login} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
