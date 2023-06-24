import { createTheme } from "@mui/material";



export const lightTheme = createTheme({
  direction: 'ltr',
  palette: {
    primary: {
      main: '#3761E9'
    },
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
    },
    text: {
      primary: "#2f2f2f",
      secondary: "#777777"
    },
    divider: '#eeeeee'
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      }
    },
    MuiPaper: {

      defaultProps: {
        sx: {
          border: 'none',
        },

        elevation: 0,
      }
    },

    MuiCssBaseline: {
      styleOverrides: `
          body{
            font-family:'poppins' , 'almarai' ;
        }
          `,
    },
  },
  typography: {
    fontFamily: ['"poppins"', '"almarai"'].join(","),
  },
});


export const darkTheme = createTheme({
  direction: 'ltr',


  palette: {
    mode: 'dark',
    primary: {
      main: "#3761E9"
    },




    background: {
      default: '#13181F',
      paper: '#171E27',
    },
    text: {
      primary: "#ffffff",
      secondary: "#eeeeee"
    },
    divider: '#373C40'
  },
  components: {


    MuiButton: {
      defaultProps: {
        sx: {
        }
      }
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },

    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
        sx: {
          border: 'none',
        }
      }
    }
  },
  typography: {
    ...lightTheme.typography
  }
})

