import React from 'react';
import Radium from 'radium';
import axios from 'axios';

import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    padding: '0 5em',
    color: colors.appPrimary,
    overflowY: 'auto'
  },
  scrollable: {
    marginBottom: '2em',
    padding: '1em',
  },
  scrollTable: {
    overflowY: 'auto',
    maxHeight: '30em',
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
        bioguide: '',
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
      console.log(response.data[0]);
      if (response.data.length === 0) {
        console.log('not found');
      } else {
        const legislator = response.data[0];
        const lastTerm = legislator.terms.slice(-1)[0];
        const bills = legislator.votes.filter((vote) => {
          return vote.bill;
        }).sort(compareBill);
        const committees = legislator.committees;

        const legislatorInfo = {}, wapoArticles = [];

        legislator.social.phone = lastTerm.phone;
        legislator.social.url = lastTerm.url;

        // Populate legislatorresentative data
        legislatorInfo.bioguide = this.props.match.params.id;
        legislatorInfo.name = legislator.name.official_full;
        legislatorInfo.state = lastTerm.state;
        legislatorInfo.party = lastTerm.party;
        if (lastTerm.type === 'sen') {
          legislatorInfo.position = 'Senator';
        } else {
          legislatorInfo.position = 'Representative';
        }
        legislatorInfo.social = legislator.social;

        // Populate committees

        this.setState({
          legislatorInfo: legislatorInfo,
          votingRecord: bills,
          committees: committees,
          wapoArticles: []
        });

      }
    });
  }

  render() {
    const records = [];
    for (let i = 0; i < this.state.votingRecord.length; i++) {
      const record = this.state.votingRecord[i];
      console.log(record);
      const billId = record.bill.type + record.bill.number + '-' + record.bill.congress;
      records.push(
          <tr key={i}>
            <td><Link to={'/ducky/bill/'+billId}>{billId}</Link></td>
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
            <div style={styling.scrollable}>
              <h1>Voting Record</h1>
              <div style={styling.scrollTable}>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Bill ID</th>
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
            </div>
            <div style={styling.scrollable}>
              <h1>Committees</h1>
              <div style={styling.scrollTable}>
                <Table responsive style={styling.scrollTable}>
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
                      <th><Link to={'/ducky/committee/'+committee.thomas_id}>{committee.thomas_id}</Link></th>
                      <th>{committee.name}</th>
                    </tr>)
                    })
                    }
                  </tbody>
                </Table>
              </div>
            </div>
            <div style={styling.scrollable}>
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
