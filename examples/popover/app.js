"use strict";

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {TeeThemeProvider, PopoverContainer, Popover} from '../../src';

class App extends Component {

  state = {
    show: false
  };

  toggle = () => {
    let show = this.state.show;
    let placements = ['left', 'top', 'right', 'bottom'];
    let placement = this.state.placement;

    placement = placements[placements.indexOf(placement) + 1];

    if (!show) {
      show = true;
      placement = placements[0];
    }
    else if (!placement) {
      show = false;
    }

    return this.setState({show, placement});
  };

  render() {

    const rootStyle = {
      position: 'relative',
      height: 120,
      padding: '50px 300px'
    };

    return (
      <TeeThemeProvider>
        <div style={rootStyle}>
          <span ref='target' onClick={this.toggle}>
            I am an Overlay target
          </span>
          <p>
            keep clicking to see the overlay placement change
          </p>

          <Popover
            color="white"
            borderColor="transparent"
            backgroundColor="black"
            show={this.state.show}
            onHide={() => this.setState({show: false})}
            placement={this.state.placement}
            container={this}
            target={ props => ReactDOM.findDOMNode(this.refs.target)}
          >
            I'm placed to the: <strong>{this.state.placement}</strong>
          </Popover>
        </div>
      </TeeThemeProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('container'));
