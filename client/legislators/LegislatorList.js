import React from 'react';
import Radium from 'radium';
import axios from 'axios';
import debounce from 'debounce';

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
  },
  searchOptions: {
    display: 'inline'
  },
  searchOpt: {
    margin: '0 1em',
    display: 'inline'
  }
};

class LegislatorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      legislators: [],
      legislatorsFiltered: [],
      nameVal: '',
      posVal: 'all',
      stateVal: '',
      partyVal: 'all'
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.updateSearch = debounce(this.updateSearch, 1000);
    this.searchClear = this.searchClear.bind(this);
  }

  componentDidMount() {
    axios.get('/api/legislators/current').then((response) => {
      const tempState = this.state;
      tempState.legislators = response.data;
      tempState.legislatorsFiltered = response.data;
      this.setState(tempState);
    });
  }

  onNameChange(event) {
    const tempState = this.state;
    tempState.nameVal = event.target.value;
    this.setState(tempState);
    this.updateSearch();
  }

  onPosChange(event) {
    const tempState = this.state;
    tempState.posVal = event.target.value;

    this.setState(tempState);
    this.updateSearch();
  }

  onStateChange(event) {
    const tempState = this.state;
    tempState.stateVal = event.target.value;

    this.setState(tempState);
    this.updateSearch();
  }

  onPartyChange(event) {
    const tempState = this.state;
    tempState.partyVal = event.target.value;

    this.setState(tempState);
    this.updateSearch();
  }

  updateSearch() {
    const state = this.state;
    const legislatorList = this.state.legislators;
    const nameVal = this.state.nameVal;
    const posVal = this.state.posVal;
    const stateVal = this.state.stateVal;
    const partyVal = this.state.partyVal;
    const filtered = searchName(searchPos(searchState(searchParty(legislatorList))));
    state.legislatorsFiltered = filtered;

    console.log(stateVal);
    console.log(partyVal);
    this.setState(state);

    function searchName(legislatorList) {
      if (nameVal) {
        const filteredArray = legislatorList.filter((legislator) => {
          return legislator.name.official_full.toLowerCase().includes(nameVal.toLowerCase());
        });
        return filteredArray;
      }
      return legislatorList;
    }

    function searchPos(legislatorList) {
      if (posVal === 'all') {
        return legislatorList;
      } else if (posVal === 'sen') {
        return legislatorList.filter((legislator) => {
          return legislator.terms[legislator.terms.length-1].type === 'sen';
        });
      } else {
        return legislatorList.filter((legislator) => {
          return legislator.terms[legislator.terms.length-1].type === 'rep';
        });
      }
      return legislatorList;
    }

    function searchState(legislatorList) {
      if (stateVal) {
        return legislatorList.filter((legislator) => {
          console.log(legislator.terms[legislator.terms.length-1].state);
          return legislator.terms[legislator.terms.length-1].state === stateVal;
        });
      }
      return legislatorList;
    }

    function searchParty(legislatorList) {
      if (partyVal === 'all') {
        return legislatorList;
      } else {
        return legislatorList.filter((legislator) => {
          console.log(legislator.terms[legislator.terms.length-1].party);
          return legislator.terms[legislator.terms.length-1].party === partyVal;
        });
      }
    }

  }

  searchClear() {

  }

  render() {
    return (
        <div style={styling.container}>
          <h1>Current Legislators</h1>
          <div style={styling.searchOptions}>
            <div style={styling.searchOpt}>
              <span>Name: </span>
              <input type="text" name="nameVal" value={this.state.nameVal} onChange={this.onNameChange.bind(this)} />
            </div>
            <div style={styling.searchOpt}>
              <span>Position: </span>
              <select value={this.state.posValue} onChange={this.onPosChange.bind(this)}>
                <option value="all">All</option>
                <option value="sen">Senators</option>
                <option value="rep">Reps</option>
              </select>
            </div>
            <div style={styling.searchOpt}>
              <span>State: </span>
              <input type="text" name="stateVal" value={this.state.stateVal} onChange={this.onStateChange.bind(this)} />
            </div>
            <div style={styling.searchOpt}>
              <span>Party: </span>
              <select value={this.state.partyValue} onChange={this.onPartyChange.bind(this)}>
                <option value="all">All</option>
                <option value="Republican">Republican</option>
                <option value="Democrat">Democrat</option>
                <option value="Independent">Independent</option>
              </select>
            </div>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>State</th>
                <th>Party</th>
              </tr>
            </thead>
            <tbody>
              {
              this.state.legislatorsFiltered.map((legislator) => {
              return (
              <tr key={legislator.id.bioguide}>
                <td>{legislator.name.first}</td>
                <td>{legislator.name.last}</td>
                <td>{legislator.terms[legislator.terms.length-1].type === 'sen' ? 'Senator' : 'Representative' }</td>
                <td>{legislator.terms[legislator.terms.length-1].state}</td>
                <td>{legislator.terms[legislator.terms.length-1].party}</td>
                <td>
                  <Link to={'/ducky/legislator/'+legislator.id.bioguide}>
                    More info
                  </Link>
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

export default Radium(LegislatorList);
