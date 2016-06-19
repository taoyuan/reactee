"use strict";

import React, {Component, PropTypes} from 'react';
import cx from 'classnames';

import {isGroup} from '../utils';
import Spacer from './Spacer';
import ChevronRight from './ChevronRight';

export default class NavItem extends Component {

  static propTypes = {
    nav: PropTypes.element.isRequired,
    onClick: PropTypes.func
  };

  handleClick = (nav) => {
    if (this.props.onClick) {
      this.props.onClick(nav);
    }
  };

  renderIcon(icon) {
    if (typeof icon === 'function') {
      return React.createElement(icon, {className: "nav-icon"});
    } else {
      return <span className={cx('nav-icon', icon)}/>;
    }
  }

  render() {
    const {nav} = this.props;
    if (nav.type === Spacer) {
      return nav;//React.cloneElement(nav, {key: nav.props.id + '-spr-' + index});
    }

    const {icon, text, url, selected} = nav.props;
    const openable = isGroup(nav);
    const expander = openable && <ChevronRight/>;
    return (
      <li className={cx('nav-item', {
        'nav--selected': selected,
        'nav--openable': openable
      })}>
        <a className="nav-link" href={url} onClick={() => this.handleClick(nav)}>
           {icon && this.renderIcon(icon)}
           {icon ? <span className="nav-text">{text}</span> : text}
           {expander}
        </a>
      </li>
    )
  }
}
