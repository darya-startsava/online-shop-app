import React from 'react';
import './App.scss';
import Router from './router';
import Header from './header/containers/header';

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
