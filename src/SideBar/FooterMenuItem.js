"use strict";

import React, {Component, PropTypes} from 'react';


export default class FooterMenuItem extends Component {

  static propStyles = {
    className: PropTypes.string,
    style: PropTypes.object,
    linkStyle: PropTypes.object,
    url: PropTypes.string,
    text: PropTypes.string
  };

  render() {

    let {className, style, linkStyle, url, text} = this.props;

    style = Object.assign({
      listStyle: 'none',
      margin: 0
    }, style);


    linkStyle = Object.assign({
      display: 'block',
      padding: '5px 20px 5px 5px',
      cursor: 'pointer',
      color: '#0069a6',
      textDecoration: 'none'
    }, linkStyle);

    return (
      <li className={className} style={style}>
        <a href={url} style={linkStyle}>
           {text}
        </a>
      </li>
    )
  }
}
