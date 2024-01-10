type CommunityColors = {
  [key in 'gray' | 'primary' | 'secondary' | 'gradient']: {
    [index: number]: string;
  };
};

export const colors: CommunityColors = {
  gray: {
    1100: '#000000',
    1000: '#101010',
    900: '#48464C',
    800: '#58555C',
    700: '#75717A',
    600: '#666666',
    500: '#999999',
    400: '#A5AEB8',
    300: '#B8C2CC',
    200: '#D9D9D9',
    100: '#F1F1F1',
    80: '#F2F4F5',
    50: '#FAFBFE',
    30: '#F8F8F9',
    20: '#FBFBFB',
    0: '#FFFFFF',
  },

  primary: {
    900: '#741538',
    800: '#892745',
    700: '#CD4949',
    600: '#E64D4D',
    500: '#FF5656',
    400: '#F47373',
    300: '#FF9292',
    200: '#FCDEDE',
    100: '#FCEEEE',
    50: '#FFF2F2',
    30: '#FFF6F6',
    0: '#FFFFFF',
  },

  secondary: {
    900: '#811331',
    800: '#9A1E40',
    700: '#BA254D',
    600: '#DD406A',
    500: '#FC5280',
    400: '#FA6B92',
    300: '#FF95B2',
    200: '#FFC7D6',
    100: '#FFD7E2',
    50: '#FFEDF1',
    30: '#FFF0F3',
    0: '#FFFFFF',
  },

  gradient: {
    1: 'linear-gradient(104deg, #FF5656 7%, #EF30BA 96%)',
    2: 'linear-gradient(104deg, #F77 7%, #FF9EE4 96%)',
    3: 'linear-gradient(104deg, #FF7B7F 7%, rgba(255, 123, 127, 0.00) 96%)',
    4: 'linear-gradient(180deg, #FF5656 0%, #FF1579 100%)',
  },
};
