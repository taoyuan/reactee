/**
 * Mostly from Bootstrap
 *
 * http://react-bootstrap.github.io/react-overlays/examples/#overlay
 */

import React, {PropTypes} from 'react';
import {Overlay} from 'react-overlays';

import {styleSides} from '../utils';

function getStyles(props, context, state) {
  const {
    teeTheme: {
      popover
    }
  } = context;

  let {
    color = popover.textColor,
    borderColor = popover.borderColor,
    backgroundColor = popover.backgroundColor
  } = props;

  const {arrowSize} = popover;
  const arrowMaskSize = arrowSize - 1;

  borderColor = borderColor || popover.borderColor;

  return {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: 1,
      color: color,
      textAlign: 'center',
      borderRadius: 3,
      backgroundColor: backgroundColor,
      border: `1px solid ${borderColor}`
    },
    content: {
      padding: '9px 14px',
    },
    arrow: {
      position: 'absolute',
      display: 'block',
      width: 0,
      height: 0,
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: arrowSize
    },
    arrowMask: {
      borderWidth: arrowMaskSize
    },
    placement: {
      left: {
        popover: {
          marginLeft: -arrowMaskSize,
        },
        arrow: {
          top: '50%',
          right: -arrowSize,
          marginTop: -arrowSize,
          borderWidth: styleSides(arrowSize + 'px', {right: 0}),
          borderColor: styleSides('transparent', {left: borderColor})
        },
        arrowMask: {
          top: '50%',
          right: -arrowMaskSize,
          marginTop: -arrowSize,
          borderWidth: styleSides(arrowSize + 'px', {right: 0}),
          borderColor: styleSides('transparent', {left: backgroundColor})
        }
      },
      right: {
        popover: {
          marginLeft: arrowMaskSize,
        },
        arrow: {
          top: '50%',
          left: -arrowSize,
          marginTop: -arrowSize,
          borderWidth: styleSides(arrowSize + 'px', {left: 0}),
          borderColor: styleSides('transparent', {right: borderColor})
        },
        arrowMask: {
          top: '50%',
          left: -arrowMaskSize,
          marginTop: -arrowSize,
          borderWidth: styleSides(arrowSize + 'px', {left: 0}),
          borderColor: styleSides('transparent', {right: backgroundColor})
        }
      },
      top: {
        popover: {
          marginTop: -arrowMaskSize,
        },
        arrow: {
          left: '50%',
          bottom: -arrowSize,
          marginLeft: -arrowSize,
          borderWidth: styleSides(arrowSize + 'px', {bottom: 0}),
          borderColor: styleSides('transparent', {top: borderColor})
        },
        arrowMask: {
          left: '50%',
          bottom: -arrowMaskSize,
          marginLeft: -arrowSize,
          borderWidth: styleSides(arrowSize + 'px', {bottom: 0}),
          borderColor: styleSides('transparent', {top: backgroundColor})
        }
      },
      bottom: {
        popover: {
          marginTop: arrowMaskSize,
        },
        arrow: {
          left: '50%',
          top: -arrowSize,
          marginLeft: -arrowSize,
          borderWidth: styleSides(arrowSize + 'px', {top: 0}),
          borderColor: styleSides('transparent', {bottom: borderColor})
        },
        arrowMask: {
          left: '50%',
          top: -arrowMaskSize,
          marginLeft: -arrowSize,
          borderWidth: styleSides(arrowSize + 'px', {top: 0}),
          borderColor: styleSides('transparent', {bottom: backgroundColor})
        }
      }
    }
  }
}

class PopoverPanel extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    color: PropTypes.string,
    borderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    placement: PropTypes.string,
    left: PropTypes.object,
    top: PropTypes.object,
    children: PropTypes.any
  };

  static defaultProps = {
    placement: 'top'
  };

  static contextTypes = {
    teeTheme: PropTypes.object
  };

  render() {
    const {populate} = this.context.teeTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const placementStyle = styles.placement[this.props.placement];
    const {className, style, children} = this.props;

    const popoverStyle = populate({}, styles.root, placementStyle.popover, style);
    const arrowStyle = populate({}, styles.arrow, placementStyle.arrow);
    const arrowMaskStyle = populate(styles.arrow, placementStyle.arrowMask);

    return (
      <div className={className} style={popoverStyle}>
        <div style={arrowStyle}/>
        <div style={arrowMaskStyle}/>
        <div style={populate(styles.content)}>
             {children}
        </div>
      </div>
    );
  }
}

export class Popover extends React.Component {

  render() {
    return (
      <Overlay {...this.props}>
        <PopoverPanel {...this.props}>
                      {this.props.children}
        </PopoverPanel>
      </Overlay>
    );
  }
}


export default Popover;
