"use strict";

import React, {Component, PropTypes} from 'react';
import invariant from 'invariant';

export default class Nav extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    icon: PropTypes.any,
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    selected: PropTypes.bool,
    children: PropTypes.node,
  };

  render() {
    invariant(
      false,
      '<Nav> elements are for SideBar configuration only and should not be rendered'
    )
  }
}
