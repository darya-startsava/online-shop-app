import React from 'react';
import './App.css';
import Router from './router';
import Header from './header/header';

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <Header />
        <Router />
      </div>
    );
  }
}

export default App;
