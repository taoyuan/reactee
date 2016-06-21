import {Component, PropTypes} from 'react';
import getTeeTheme from './getTeeTheme';

class TeeThemeProvider extends Component {

  static propTypes = {
    children: PropTypes.element,
    teeTheme: PropTypes.object,
  };

  static childContextTypes = {
    teeTheme: PropTypes.object.isRequired,
  };

  getChildContext() {
    return {
      teeTheme: this.props.teeTheme || getTeeTheme(),
    };
  }

  render() {
    return this.props.children;
  }
}

export default TeeThemeProvider;
