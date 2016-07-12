"use strict";

import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import {isGroup, noop} from '../utils';
import Nav from './Nav';
import ArrowRight from './ArrowRight';

function getStyles(props, context, state) {
  const {item, expanded} = props;
  const {selected} = item.props;
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
      lineHeight: 'normal',
      textDecoration: 'none'
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
    arrow: {
      fontSize: 16,
      color: textColor,
      textDecoration: 'none'
    }
  }
}

export default class NavItem extends Component {

  static propTypes = {
    item: PropTypes.element.isRequired,
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

  handleClick = (item) => {
    if (this.props.onClick) {
      this.props.onClick(item);
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
    const {item} = this.props;
    if (item.type !== Nav) {
      return item;
    }

    const {icon, text, url} = item.props;

    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context, this.state);


    const openable = isGroup(item);
    const arrow = openable && <ArrowRight size={20} style={populate(styles.arrow)}/>;
    return (
      <li style={populate(styles.root)}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
        <a style={populate(styles.link)} href={url} onClick={() => this.handleClick(item)}>
           {icon && this.renderIcon(icon, styles.icon)}
           {icon ? <span style={populate(styles.text)}>{text}</span> : text}
           {arrow}
        </a>
      </li>
    )
  }
}
