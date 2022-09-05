import React from 'react';
import './App.css';

import { queryProductsByCategory } from './queries';

class App extends React.Component {
  constructor() {
    super();
    this.state = { data: [1] };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.sendFetch = this.sendFetch.bind(this);
  }

  async componentDidMount() {
    await this.sendFetch();
  }

  async sendFetch() {
    const queryResult = await queryProductsByCategory('tech');
    this.setState({ data: queryResult });
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="App">
        <header className="App-header"></header>
      </div>
    );
  }
}

export default App;
