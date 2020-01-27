import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/navigation';
import contList from './components/contList';
import createUser from './components/createUser';

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
        <Route path="/" exact component={contList} />
        <Route path="/user/:id?" component={createUser} />
      </div>
    </Router>
  );
}
export default App;