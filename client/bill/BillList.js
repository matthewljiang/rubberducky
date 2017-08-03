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


class BillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: []
    };
  }

  componentDidMount() {
    axios.get('/api/bills/current').then((response) => {
      this.setState({bills: response.data});
    });
  }

  render() {
    return (
        <div style={styling.container}>
          <h1>Bills</h1>
          <Table responsive>
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Title</th>
                <th>Number</th>
                <th>Introduced</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.bills.map((bill) => {
              return (
              <tr key={bill._id.$oid}>
                <td style={{width:'10%'}}>
                  <Link to ={'/ducky/bill/' + bill.bill_id}>
                    { bill.bill_id }
                  </Link>
                </td>
                <td style={{width:'76%'}}>{bill.official_title}</td>
                <td style={{width:'7%'}}>{bill.number}</td>
                <td style={{width:'7%'}}>{bill.introduced_at}</td>
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

export default Radium(BillList);
