import merge from 'lodash/merge';
import {darken, fade, emphasize, lighten} from '../utils/colorManipulator';
import lightBaseTheme from './baseThemes/lightBaseTheme';
import zIndex from './styles/zIndex';
import autoprefixer from '../utils/autoprefixer';
import callOnce from '../utils/callOnce';
import rtl from '../utils/rtl';
import compose from 'recompose/compose';
import typography from './styles/typography';
import {
  red500, grey400, grey500, grey600, grey700,
  transparent, lightWhite, white, darkWhite, lightBlack, black,
} from './styles/colors';

/**
 * Get the Tee theme corresponding to a base theme.
 * It's possible to override the computed theme values
 * by providing a second argument. The calculated
 * theme will be deeply merged with the second argument.
 */
export default function getTeeTheme(teeTheme, ...more) {
  teeTheme = merge({
    zIndex,
    isRtl: false,
    userAgent: undefined,
  }, lightBaseTheme, teeTheme, ...more);

  const {spacing, fontFamily, palette} = teeTheme;
  const baseTheme = {spacing, fontFamily, palette};

  teeTheme = merge({
    sidebar: {
      width: 240,
      headerHeight: 56,
      headerImageSize: 36,
      indent: 20,
      collapseWidth: 56,
      itemHeight: 40,
      itemIconSize: 20,
      spacerHeight: 20,
      headerColor: '#212529',
      headerTextColor: white,
      panelColor: '#31373d',
      collapsedPanelColor: '#212529',
      selectedColor: '#454e57',
      itemTextColor: '#c3cfd8',
      hoverTextColor: white,
      selectedTextColor: white,
      textColor: white,
      footerLinkColor: '#0069a6',
      footerSectionDivideColor: '#ebeef0'
    },
    popover: {
      textColor: black,
      borderColor: '#ccc',
      backgroundColor: '#fff',
      arrowSize: 8,
    }
  }, teeTheme, {
    baseTheme, // To provide backward compatibility.
    rawTheme: baseTheme, // To provide backward compatibility.
  });

  const transformers = [autoprefixer, rtl, callOnce].map((t) => t(teeTheme)).filter((t) => t);
  const transform = compose(...transformers);

  teeTheme.populate = teeTheme.prepareStyles = function (...arg) {
    return transform(Object.assign(...arg));
  };

  return teeTheme;
}
