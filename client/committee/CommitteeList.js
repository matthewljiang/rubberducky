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

class CommitteeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       committees: []
    };
  }

  componentDidMount() {

  }

  render() {
    return (
        <div style={styling.container}>
          <h1>Current Committees</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.committees.map((committee) => {
                  return (
                  <tr key={committee.tag}>
                    <td>
                      <Link to={'/committee/'+committee.tag}>
`                       { committee.tag }
                      </Link>
                    </td>
                    <td>
                      { committee.name }
                    </td>
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

export default Radium(CommitteeList);
