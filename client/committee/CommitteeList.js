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


class CommitteeList extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      committees: []
    }
  }

  componentDidMount() {
    axios.get('/api/committees/current').then((response) => {
      this.setState({committees: response.data});
    });
  }

  render() {
    return (
      <div style={styling.container}>
        <h1>Current Committee</h1>
        <Table responsive>
          <thead>
            <tr>
              <th>Committee ID</th>
              <th>Title</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            {
            this.state.committees.map((committee) => {
            return (
            <tr key={committee.thomas_id}>
              <td style={{width:'20%'}}>
                <Link to ={'/ducky/committee/' + committee.thomas_id}>
                  { committee.thomas_id }
                </Link>
              </td>
              <td style={{width:'60%'}}>{committee.name}</td>
              <td style={{width:'20%'}}> <a href={committee.url}>{committee.url}</a> </td>
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
