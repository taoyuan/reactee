"use strict";

import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import {isGroup, noop} from '../utils';
import Spacer from './Spacer';
import ChevronRight from './ChevronRight';

function getStyles(props, context, state) {
  const {nav, expanded} = props;
  const {selected} = nav.props;
  const {sidebar} = context.teeTheme;

  const textColor = state.hovered ? sidebar.hoverTextColor : (
    selected ? sidebar.selectedTextColor : sidebar.itemTextColor
  );

  return {
    root: {
      display: 'block',
      minHeight: sidebar.itemHeight,
      backgroundColor: selected && sidebar.selectedColor
    },
    link: {
      fontSize: 14,
      textTransform: 'initial',
      letterSpacing: 'initial',
      color: textColor,
      padding: `0 10px 0 ${sidebar.indent}px`,
      height: sidebar.itemHeight,
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      lineHeight: 'normal'
    },
    text: {
      color: textColor,
      textDecoration: 'none',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-block',
      marginLeft: 10,
      flexGrow: 1,
      flexBasis: '0%',
      transition: 'transform 200ms ease, opacity 200ms ease',
      transform: expanded ? 'translateX(-15px)' : null,
      opacity: expanded ? 0 : 1
    },
    icon: {
      fontSize: 18,
      color: textColor,
      textDecoration: 'none',
      position: 'relative',
      width: sidebar.iconSize,
      height: sidebar.iconSize
    },
    expander: {
      fontSize: 18,
      color: textColor,
      textDecoration: 'none'
    }
  }
}

export default class NavItem extends Component {

  static propTypes = {
    nav: PropTypes.element.isRequired,
    expanded: PropTypes.bool,
    onClick: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onMouseEnter: PropTypes.func
  };

  static defaultProps = {
    onClick: noop,
    onMouseLeave: noop,
    onMouseEnter: noop
  };

  static contextTypes = {
    teeTheme: PropTypes.object.isRequired,
  };

  state = {
    hovered: false,
  };

  handleMouseLeave = (event) => {
    this.setState({hovered: false});
    this.props.onMouseLeave(event);
  };

  handleMouseEnter = (event) => {
    this.setState({hovered: true});
    this.props.onMouseEnter(event);
  };

  handleClick = (nav) => {
    if (this.props.onClick) {
      this.props.onClick(nav);
    }
  };

  renderIcon(icon, style) {
    const {populate} = this.context.teeTheme;
    if (typeof icon === 'function') {
      return React.createElement(icon, {style: populate(style)});
    } else {
      return <span className={cx(icon)} style={populate(style)}/>;
    }
  }

  render() {
    const {nav} = this.props;
    if (nav.type === Spacer) {
      return nav;
    }

    const {icon, text, url} = nav.props;

    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context, this.state);


    const openable = isGroup(nav);
    const expander = openable && <ChevronRight size={20} style={populate(styles.expander)}/>;
    return (
      <li style={populate(styles.root)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
        <a style={populate(styles.link)} href={url} onClick={() => this.handleClick(nav)}>
           {icon && this.renderIcon(icon, styles.icon)}
           {icon ? <span style={populate(styles.text)}>{text}</span> : text}
           {expander}
        </a>
      </li>
    )
  }
}
