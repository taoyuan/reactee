"use strict";

import React, {Component} from 'react';

export default class Spacer extends Component {

  render() {
    const style = {
      height: 20,
      minHeight: 20
    };
    return <li style={style}/>
  }
}
