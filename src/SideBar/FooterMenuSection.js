"use strict";

import React, {Component, PropTypes} from 'react';

export default class FooterMenuSection extends Component {

  static propStyles = {
    className: PropTypes.string,
    style: PropTypes.object
  };

  render() {

    let {className, style, children} = this.props;

    const defaultStyle = {
      padding: 10,
    };

    return (
      <div className={className} style={{...defaultStyle, ...style}}>
        {children}
      </div>
    )
  }
}
