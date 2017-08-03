import React from 'react';
import Radium from 'radium';
import axios from 'axios';

import { Table } from 'react-bootstrap';
import LegislatorSidebar from './components/LegislatorSidebar.js';
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

class Legislator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legislatorInfo: {
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
    axios.get( '/api/legislator', {
      params: {
        bioguide: this.props.match.params.id
      }
    }).then((response) => {
      if (response.data.length === 0) {
        console.log('not found');
      } else {
        const legislator = response.data[0];
        const lastTerm = legislator.terms.slice(-1)[0];
        const bills = legislator.votes.filter((vote) => {
          return vote.bill;
        }).sort(compareBill).slice(0,10);

        const legislatorInfo = {}, votingRecord = [], committees = [],
        wapoArticles = [];

        legislator.social.phone = lastTerm.phone;
        legislator.social.url = lastTerm.url;

        // Populate legislatorresentative data
        legislatorInfo.name = legislator.name.official_full;
        legislatorInfo.state = lastTerm.state;
        legislatorInfo.party = lastTerm.party;
        legislatorInfo.social = legislator.social;

        // Populate committees

        this.setState({
          legislatorInfo: legislatorInfo,
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
          <LegislatorSidebar info={this.state.legislatorInfo}/>
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

export default Radium(Legislator);
