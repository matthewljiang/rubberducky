import React from 'react';
import Radium from 'radium';
import axios from 'axios';

import { Table } from 'react-bootstrap';
import RepSidebar from './components/RepSidebar.js';
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

function compareBill(a,b) {
  if (a.date < b.date)
    return 1;
  if (a.date > b.date)
    return -1;
  return 0;
}

class Rep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repInfo: {
        name: '',
        email: '',
        social: {},
        state: '',
        party: ''
      },
      votingRecord: [],
      committees: [],
      wapoArticles: []
    };
  }

  componentDidMount() {
    // Call API here using props.match.params.repId.
    axios.get( '/api/legislator', {
      params: {
        bioguide: this.props.match.params.repId
      }
    }).then((response) => {
      if (response.data.length === 0) {
        console.log('not found');
      } else {
        const rep = response.data[0];
        const lastTerm = rep.terms.slice(-1)[0];
        const bills = rep.votes.filter((vote) => {
          return vote.bill;
        }).sort(compareBill).slice(0,10);

        const repInfo = {}, votingRecord = [], committees = [],
        wapoArticles = [];

        // Populate representative data
        repInfo.name = rep.name.official_full;
        repInfo.state = lastTerm.state;
        repInfo.party = lastTerm.party;
        repInfo.social = rep.social;

        // Populate voting record


        // Populate committees



        this.setState({
          repInfo: repInfo,
          votingRecord: bills,
          committees: [],
          wapoArticles: []
        });

      }
    });
  }

  render() {
    const records = [];
    for (let i = 0; i < this.state.votingRecord.length; i++) {
      const record = this.state.votingRecord[i];
      records.push(
          <tr key={i}>
            <td>{record.bill.number}</td>
            <td>{record.bill.title}</td>
            <td>{record.vote}</td>

          </tr>
          );
    }
    return (
        <div style={styling.container}>
          <RepSidebar info={this.state.repInfo}/>
          <div style={styling.body}>
            <div>
              <h1>Voting Record</h1>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Bill Number</th>
                    <th>Bill Name</th>
                    <th>Vote</th>
                  </tr>
                </thead>
                <tbody>
                  {records}
                </tbody>
              </Table>
            </div>
            <div>
              <h1>Committees</h1>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Committee Tag</th>
                    <th>Committee Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.committees.map((committee) => {
                  return (
                  <tr>
                    <th>{committee.tag}</th>
                    <th>{committee.name}</th>
                  </tr>)
                  })
                  }
                </tbody>
              </Table>
            </div>
            <div>
              <h1>Washington Post Articles</h1>
              <ul>
                {
                this.state.wapoArticles.map((article) => {
                return (
                <li>
                  {article.title}
                </li>
                )
                })
                }
              </ul>
            </div>
          </div>
        </div>
        );
  }
};

export default Radium(Rep);
