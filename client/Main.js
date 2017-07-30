import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Titlebar from './core/Titlebar.js';
import Home from './home/Home.js';
import colors from './core/colors.js';

const styling = {
  main: {
    backgroundColor: colors.pageBackground,
  }
};

var Main = React.createClass({
  render() {
    return (
        <Router>
          <div style={styling.main}>
            <Titlebar/>
            <Route path='/' component={Home}/>

          </div>
        </Router>
        );
  }
});

export default Main;

