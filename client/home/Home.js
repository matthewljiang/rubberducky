import React from 'react';
import Radium from 'radium';
import colors from '../core/colors.js';

const styles = {
  container: {
    padding: '2em 4em'
  }
};

class Home extends React.Component {
  render() {
    return (
          <div style={styles.container}>
            <img src='https://s3.amazonaws.com/rubberducky/duck-svg-4.png'/>
          </div>
        );
  }
};

export default Radium(Home);
