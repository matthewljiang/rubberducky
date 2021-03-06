import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Radium from 'radium';

import Titlebar from './core/Titlebar.js';
import Home from './home/Home.js';
import Legislator from './legislators/Legislator.js';
import LegislatorList from './legislators/LegislatorList.js';
import Committee from './committee/Committee.js';
import CommitteeList from './committee/CommitteeList.js';
import BillList from './bill/BillList.js';
import Bill from './bill/Bill.js';

import colors from './core/colors.js';

const styling = {
  main: {
    backgroundColor: colors.pageBackground,
    height: '100%',
    width: '100%',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    display: 'flex',
    flexFlow: 'column'
  }
};

class Main extends React.Component {
  render() {
    return (
        <Router>
          <div style={styling.main}>
            <Titlebar/>
            <Switch>
              <Route exact path='/ducky' component={Home}/>
              <Route exact path='/ducky/legislators' component={LegislatorList}/>
              <Route exact path='/ducky/legislator/:id' component={Legislator}/>
              <Route exact path='/ducky/committees' component={CommitteeList}/>
              <Route exact path='/ducky/committee/:thomas_id' component={Committee}/>
              <Route exact path='/ducky/bills' component={BillList}/>
              <Route exact path='/ducky/bill/:bill_id' component={Bill}/>
            </Switch>
          </div>
        </Router>
        );
  }
};

export default Radium(Main);
