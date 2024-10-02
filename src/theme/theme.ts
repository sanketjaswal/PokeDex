interface DefaultTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    cardBGC: string;
    dropShadow: string;
  };
}

export const theme: DefaultTheme = {
  colors: {
    primary: 'black',
    secondary: 'green',
    background: 'white',
    text: '#313131',
    cardBGC: '#cfecf0',
    dropShadow: 'black',
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: 'white',
    secondary: 'blue',
    background: 'black',
    text: 'white',
    cardBGC: 'gray',
    dropShadow: 'gold',
  },
};
