import React from 'react';
import Radium from 'radium';
import axios from 'axios';

import { Table } from 'react-bootstrap';
import colors from '../core/colors.js';

const styling = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex'
  },
  body: {
    height: '90%',
    width: '100%',
    margin: '2em',
    color: colors.appPrimary,
    overflowY: 'auto'
  }
};

const listStyle = {
  style: {
    fontweight: 'bold',
  }
}



class Committee extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      committeeInfo: {
        thomas_id: '',
        name: '',
      },
      subcommittees: []
    }
  }

  componentDidMount() {
    axios.get( '/api/committee', {
      params: {
        thomas_id: this.props.match.params.thomas_id
      }
    }).then((response) => {
      if (response.data.length === 0) {
        console.log('not found');
      } else {
        const committeeInfo = response.data[0];
        const subcommittees = committeeInfo.subcommittees;
        this.setState({
          committeeInfo: committeeInfo,
          subcommittees: subcommittees,
        });
      }
    });
  }

  render() {
    return (
      <div style={styling.container}>
        <div style={styling.body}>
          <h1>{this.state.committeeInfo.name}</h1>
          <h4>ID: {this.state.committeeInfo.thomas_id} </h4>

          <br></br>
          <h5>{this.state.committeeInfo.jurisdiction} </h5>
          <h5>Phone: {this.state.committeeInfo.phone} </h5>

          <br></br>

          <div>
            <h3> Subcommittees </h3>
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {
                this.state.subcommittees.map((subcom) => {
                return (
                <tr key={subcom.thomas_id}>
                  <td style={{width:'20%'}}>{subcom.thomas_id}</td>
                  <td style={{width:'40%'}}>{subcom.name}</td>
                  <td style={{width:'20%'}}>{subcom.phone}</td>
                </tr>
                );
                })
                }
              </tbody>
            </Table>
          </div>

        </div>
      </div>
      );
  }
}

export default Radium(Committee);
