"use strict";

import React, {Component} from 'react';

export default class FlexSpacer extends Component {

  render() {
    const style = {
      flex: 1,
      minHeight: 20
    };
    return <li style={style}/>
  }
}
