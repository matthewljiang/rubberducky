import React from 'react';
import Radium from 'radium';
import axios from 'axios';

import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import colors from '../core/colors.js';

const styling = {
  container: {
    width: '100%',
    height: '90%',
    display: 'flex',
    flexFlow: 'column',
    padding: '2em 4em'
  },
  body: {
    backgroundColor: '#fff'
  }
};

class LegislatorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legislators: []
    };
  }

  componentDidMount() {
    axios.get('/api/legislators/current').then((response) => {
      this.setState({legislators: response.data});
    });
  }

  render() {
    return (
        <div style={styling.container}>
          <h1>Current Legislators</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>BioID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>State</th>
                <th>Party</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.legislators.map((legislator) => {
              return (
              <tr key={legislator.id.bioguide}>
                <td>
                  <Link to ={'/ducky/legislator/' + legislator.id.bioguide}>
                    { legislator.id.bioguide }
                  </Link>
                </td>
                <td>{legislator.name.first}</td>
                <td>{legislator.name.last}</td>
                <td>{legislator.terms[legislator.terms.length-1].type}</td>
                <td>{legislator.terms[legislator.terms.length-1].state}</td>
                <td>{legislator.terms[legislator.terms.length-1].party}</td>

              </tr>
              );
              })
              }
            </tbody>
          </Table>
        </div>
        );
  }
}

export default Radium(LegislatorList);
