"use strict";

import React, {Component} from 'react';

export default class Spacer extends Component {

  render() {
    const style = {
      marginTop: 12,
      paddingTop: 12,
      borderTop: '1px solid #454e57'
    };
    return <li style={style}/>
  }
}
