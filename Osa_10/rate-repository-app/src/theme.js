import { Platform } from 'react-native';

const theme = {
    colors: {
        textPrimary: '#24292e',
        textSecondary: '#586069',
        primary: '#0366d6',
        mainBackground: '#e1e4e8',
        white: '#FFFFFF',
        error: '#d73a4a',
        appBarBackground: '#24292e',
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System',
        }),
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
    align: {
        center: 'center'
    },
    margin: {
        signin: 12  
    }
  };
  
  export default theme;