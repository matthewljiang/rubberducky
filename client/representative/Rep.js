import React from 'react';
import Radium from 'radium';
import { Table } from 'react-bootstrap';

import RepSidebar from './components/RepSidebar.js';

import colors from '../core/colors.js';

const styling = {
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    position: 'fixed'
  },
  body: {
    height: '100%',
    width: '100%',
    marginLeft: '3em',
    color: colors.appPrimary,
    overflowY: 'auto'
  }
};

class Rep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repInfo: {
        name: 'Susan Collins',
        email: 'susancollins@gmail.com',
        facebook: 'susancollins',
        twitter: 'susancollins',
        phone: '703-703-7030',
        state: 'VA',
        party: 'D'
      },
      votingRecord: [],
      committees: [],
      wapoArticles: []
    };
  }

  componentDidMount() {
    // Call API here using props.match.params.repId.
    this.state.votingRecord = [],
    this.state.committees = [],
    this.state.wapoArticles = []
  }

  render() {
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
                    <th>Bill Status</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  this.state.votingRecord.map((record) => {
                  return (
                  <tr>
                    <th>{record.number}</th>
                    <th>{record.name}</th>
                    <th>{record.status}</th>
                  </tr>)
                  })
                  }
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
                  this.state.votingRecord.map((committee) => {
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
