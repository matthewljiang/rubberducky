import React from 'react';
import Radium from 'radium';

const styling = {
  container: {

  }
};

class Committee extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // Call API here using props.match.params.committeeId
  }

  render() {
    return (
          <div style={styling.container}>
            <div style={styling.header}>
              <h1>Header</h1>
            </div>
            <div style={styling.info}>
              <span>Testing</span>
            </div>
            <div style={styling.votes}>
              <span>Votes</span>
            </div>
          </div>
        );
  }
}

export default Radium(Committee);
