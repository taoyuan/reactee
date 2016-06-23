"use strict";

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Avatar from 'react-avatar';
import ArrowUp from './ArrowUp'
import {noop} from '../utils';

import {Popover} from '../Popover';

function getStyles(props, context, state) {
  const {expanded} = props;
  const {
    teeTheme: {
      fontFamily,
      sidebar,
    }
  } = context;

  const textColor = state.hovered ? sidebar.hoverTextColor : sidebar.itemTextColor;

  return {
    root: {
      position: 'relative',
      fontFamily: 'BlinkMacSystemFont ' + fontFamily,
      paddingBottom: 10,
      display: 'block',
      minHeight: 40
    },
    link: {
      padding: '0 8px',
      textDecoration: 'none',
      cursor: 'pointer',
      display: 'flex',
      // width: 'calc(100% - 20px)',
      // margin: '0 auto',
      boxSizing: 'border-box',
      alignItems: 'center'
    },
    text: {
      fontSize: 12,
      textAlign: 'left',
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
    subText: {
      fontSize: 6,
      color: textColor,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'block',
    },
    arrow: {
      fontSize: 16,
      color: textColor
    }
  }
}

export default class Footer extends Component {

  static propTypes = {
    expanded: PropTypes.bool,
    avatarText: PropTypes.any,
    avatarUrl: PropTypes.any,
    avatarClass: PropTypes.any,
    text: PropTypes.string,
    subText: PropTypes.string,
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
    showPopover: false
  };

  updateState(...args) {
    this.setState(Object.assign({}, this.state, ...args));
  }

  handleClick = (e) => {
    this.updateState({showPopover: !this.state.showPopover});
  };

  handleMouseLeave = (event) => {
    this.updateState({hovered: false});
    this.props.onMouseLeave(event);
  };

  handleMouseEnter = (event) => {
    this.updateState({hovered: true});
    this.props.onMouseEnter(event);
  };

  renderText(styles) {
    const {text, subText} = this.props;
    const {populate} = this.context.teeTheme;

    let sub = null;
    if (subText) {
      sub = (
        <span style={populate(styles.subText)}>
          {subText}
        </span>
      )
    }

    return (
      <span style={populate(styles.text)}>
            {text}
            {sub}
      </span>
    )
  }

  renderChildren(children) {
    return React.Children.map(children, (child, index) => {
      const style = {
        borderTop: '1px solid #ebeef0'
      };
      return React.cloneElement(child, {
        key: 'footer-menu-' + index,
        style: index ? style : null
      })
    });
  }

  render() {
    const {avatarText, children} = this.props;

    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context, this.state);

    return (
      <footer style={populate(styles.root)}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
      >
        <div ref="target" style={populate(styles.link)} onClick={this.handleClick}>
          <Avatar name={avatarText} size={40} round/>
             {this.renderText(styles)}
          <ArrowUp size={20} style={populate(styles.arrow)}/>
        </div>
        <Popover
          rootClose
          borderColor="transparent"
          show={this.state.showPopover}
          onHide={() => this.updateState({showPopover: false})}
          placement="top"
          container={this}
          target={ props => ReactDOM.findDOMNode(this.refs.target)}
        >
          {this.renderChildren(children)}
        </Popover>
      </footer>
    )
  }
}
