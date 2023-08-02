export type Colors = {
  [key in
    | 'gray'
    | 'primary'
    | 'secondary'
    | 'semanticPositive'
    | 'semanticNegative'
    | 'gradient']: {
    [index: number]: string;
  };
};

export type ColorProps = `${keyof Colors}.${number}` | React.CSSProperties['color'];

export const colorParser = (color: string | undefined) => {
  if (!color) return undefined;
  if (color.includes('.')) {
    const [colorType, colorIndexTmp] = color?.split('.') || [];
    const colorIndex = +colorIndexTmp;
    if (isNaN(colorIndex) || !(colorType in colors)) return undefined;
    else return colors[colorType as keyof Colors][colorIndex];
  } else return color;
};

export const colors: Colors = {
  gray: {
    900: '#22282A',
    800: '#394346',
    750: '#475357',
    700: '#5C6B70',
    650: '#728388',
    600: '#819298',
    500: '#ABB6BA',
    400: '#BDC6C9',
    300: '#CFD5D8',
    200: '#E6EAEB',
    100: '#F2F4F5',
    50: '#F9FAFA',
    0: '#F9FAFA',
  },

  primary: {
    900: '#741538',
    800: '#8C2341',
    700: '#AE374F',
    600: '#D0515F',
    500: '#F26F72',
    400: '#F48D8F',
    300: '#F7ACAE',
    200: '#FACBCC',
    100: '#FDEAEB',
    50: '#FFF5F5',
    30: '#FFFAFA',
    0: '#FFFAFA',
  },

  secondary: {
    900: '#201977',
    800: '#332A90',
    700: '#4E43B3',
    600: '#6E61D7',
    500: '#9485FA',
    400: '#AB9FFB',
    300: '#C2B9FC',
    200: '#D9D3FD',
    100: '#F0EEFE',
    50: '#F7F6FF',
    0: '#F7F6FF',
  },

  semanticPositive: { 500: '#2DC4B3', 300: '#81E2D7' },
  semanticNegative: { 500: '#F76C1B', 300: '#FFAC7C' },

  gradient: {
    1: 'linear-gradient(100.73deg, #4E43B3 3.31%, #6E61D7 37.59%, #B1A0F6 67.74%, #F8ADAF 95.6%)',
    2: 'linear-gradient(360deg, #4E43B3 1.22%, #B1A0F6 44.37%, #F8ADAF 90.05%)',
    3: 'linear-gradient(258.68deg, #4E43B3 10.11%, #B1A0F6 48.6%, #FACBCC 89.57%)',
    4: 'linear-gradient(90deg, #F26F72 6.94%, #8473FF 81.94%)',
  },
};

export const brandColor = {
  kakao: '#FAE100',
  twitter: '#101010',
};
