"use strict";

import React, {Component, PropTypes} from 'react';

function getStyles(props, context, state) {
  const {hovered} = state;
  const {
    teeTheme: {
      sidebar
    }
  } = context;

  return {
    root: {
      listStyle: 'none',
      margin: 0
    },
    link: {
      display: 'block',
      padding: '5px 20px 5px 5px',
      cursor: 'pointer',
      color: sidebar.footerLinkColor,
      textAlign: 'left',
      textDecoration: hovered ? 'underline' : 'none'
    }
  }
}


export default class FooterMenuItem extends Component {

  static propStyles = {
    className: PropTypes.string,
    style: PropTypes.object,
    linkStyle: PropTypes.object,
    url: PropTypes.string,
    text: PropTypes.string,
    onClick: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func,
  };

  static contextTypes = {
    teeTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false
  };

  updateState(...args) {
    this.setState(Object.assign({}, this.state, ...args));
  }

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  handleMouseLeave = (event) => {
    this.updateState({hovered: false});
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  handleMouseEnter = (event) => {
    this.updateState({hovered: true});
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  render() {

    const {className, style, linkStyle, url, text} = this.props;

    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context, this.state);

    return (
      <li className={className} style={{...populate(styles.root), ...style}}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
      >
        <a href={url} style={{...populate(styles.link), ...linkStyle}}>
          {text}
        </a>
      </li>
    )
  }
}
