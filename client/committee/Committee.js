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

          </div>
        );
  }
}

export default Radium(Committee);
