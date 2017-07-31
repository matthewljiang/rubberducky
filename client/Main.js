import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Radium from 'radium';

import Titlebar from './core/Titlebar.js';
import Home from './home/Home.js';
import SingleRep from './representative/Rep.js';
import RepList from './representative/RepList.js';

import colors from './core/colors.js';

const styling = {
  main: {
    backgroundColor: colors.pageBackground,
    height: '100%',
    width: '100%',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif"
  }
};

class Main extends React.Component {
  render() {
    return (
        <Router>
          <div style={styling.main}>
            <Titlebar/>
            <Switch>
              <Route path='/ducky' component={Home}/>
              <Route path='/ducky/representatives' component={RepList}/>
              <Route path='/ducky/representative/:repId' component={SingleRep}/>
            </Switch>
          </div>
        </Router>
        );
  }
};

export default Radium(Main);
