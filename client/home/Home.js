import React from 'react';
import Radium from 'radium';
import colors from '../core/colors.js';

const styles = {
  container: {
    padding: '20vh',
    textAlign: 'center'
  }
};

class Home extends React.Component {
  render() {
    return (
          <div style={styles.container}>
            <img src='https://s3.amazonaws.com/rubberducky/duck-svg-4.png' style={{width: '20em'}}/>
            <h1> Welcome to RubberDucky </h1>
          </div>
        );
  }
};

export default Radium(Home);
