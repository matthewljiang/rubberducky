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


class Bill extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billInfo: {
        bill_id: '',
        official_title: '',
        introduced_at: '',
        status: '',
        number: ''
      },
      actions: [],
      sponsor: {},
      committees: [],
      votes: {}
    };
    this.votes = this.votes.bind(this);
  }

  componentDidMount() {
    axios.get( '/api/bill', {
      params: {
        bill_id: this.props.match.params.bill_id
      }
    }).then((response) => {
      if (response.data.length === 0) {
        console.log('not found');
      } else {
        const billInfo = response.data[0];
        const actions = billInfo.actions;
        const committees = billInfo.committees;
        const sponsor = billInfo.sponsor;
        this.setState({
          billInfo: billInfo,
          actions: actions,
          committees: committees,
          sponsor: sponsor
        });
      }
    });


    axios.get( '/api/bill/votes', {
      params: {
        bill_id: this.props.match.params.bill_id
      }
    }).then((response) => {
      if (response.data.length === 0) {
        console.log('not found');
      } else {
        const info = response.data[0];
        const votes = info.votes;
        this.setState({
          votes: votes
        });
      }
    });

  }

  votes() {
    if(Object.keys(this.state.votes).length === 0) {
      return <h3> Has not been voted on yet. </h3>
    } else {
      return <h1> </h1>
    }
  }



  render() {
    return (
        <div style={styling.container}>
          <div style={styling.body}>
            <h1>Bill  {this.state.billInfo.bill_id}</h1>
            <h4>Title: {this.state.billInfo.official_title} </h4>

            <br></br>
            <div>
              <h5> Introduced: {this.state.billInfo.introduced_at} </h5>
              <h5> Bill Number: {this.state.billInfo.number} </h5>
              <h5> Status: {this.state.billInfo.status} </h5>
              <h5> Sponsor: {this.state.sponsor.name} {this.state.sponsor.title} - {this.state.sponsor.state} </h5>
            </div>

            <br></br>

            <div style={{display: 'inline-flex'}}>
              <div style={{width:'50%', margin: '1em'}}>
                <h3> Bill History </h3>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Action Code</th>
                      <th>Text</th>
                      <th>Acted At</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    this.state.actions.map((action) => {
                    return (
                    <tr key={action.action_code}>
                      <td style={{width:'20%'}}>{action.action_code}</td>
                      <td style={{width:'40%'}}>{action.text}</td>
                      <td style={{width:'20%'}}>{action.acted_at}</td>
                      <td style={{width:'20%'}}>{action.type}</td>
                    </tr>
                    );
                    })
                    }
                  </tbody>
                </Table>
              </div>

              <div style={{width:'50%', margin: '1em'}}>
                <h3> Committee History </h3>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Committee ID</th>
                      <th>Committee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                    this.state.committees.map((committee) => {
                    return (
                    <tr key={committee.committee_id}>
                      <td style={{width:'10%'}}>{committee.committee_id}</td>
                      <td style={{width:'10%'}}>{committee.committee}</td>
                    </tr>
                    );
                    })
                    }
                  </tbody>
                </Table>
              </div>
            </div>



            {this.votes()}

          </div>
        </div>
        );
  }
};

export default Radium(Bill);
