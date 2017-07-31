import React from 'react';
import Radium from 'radium';
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
  }
};

class RepList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reps: []
    };
  }

  componentDidMount() {
    this.state.reps = [];
    console.log("Did Mount");
  }

  render() {
    return (
        <div style={styling.container}>
          <h1>Current Representatives</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>BioID</th>
                <th>Name</th>
                <th>State</th>
                <th>Party</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.reps.map((rep) => {
              return (
              <tr key={rep.bioId}>
                <td>
                  <Link to ={'/representative/' + rep.bioId}>
                    { rep.bioId }
                  </Link>
                </td>
                <td>{rep.name}</td>
                <td>{rep.state}</td>
                <td>{rep.party}</td>
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

export default Radium(RepList);
