"use strict";

import React from 'react';

export function noop() {
}

export function isGroup(nav) {
  return nav && !!nav.props.children;
}

export function getItems(from) {
  const navs = [];
  const children = Array.isArray(from) ? from : from.props.children;
  if (children) {
    React.Children.forEach(children, (nav) => {
      if (React.isValidElement(nav)) {
        navs.push(nav);
      }
    });
  }
  return navs.length ? navs : null;
}

export function pick(o, ...fields) {
  return fields.reduce((a, x) => {
    if(o.hasOwnProperty(x)) a[x] = o[x];
    return a;
  }, {});
}

export function styleSides(defaults, props) {
  return ['top', 'right', 'bottom', 'left'].map(side => {
    return props && side in props ? props[side] : defaults;
  }).reduce((result, side) => `${result} ${side}`, '').substr(1);
}
