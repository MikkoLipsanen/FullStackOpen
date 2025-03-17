import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fontSizes.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorTextWhite: {
    color: theme.colors.white,
  },
  colorTextBlue: {
    color: theme.colors.primary
  },
  colorError: {
    color: theme.colors.error,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  alignCenter: {
    textAlign: theme.align.center
  },
  signinMargin: {
    margin: theme.margin.signin
  }
});

const Text = ({ color, fontSize, fontWeight, align, margin, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorTextWhite,
    color === 'blue' && styles.colorTextBlue,
    color === 'error' && styles.colorError,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    align == 'center' && styles.alignCenter,
    margin == 'signin' && styles.signinMargin,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;