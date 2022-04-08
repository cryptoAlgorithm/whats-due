import { createTheme } from '@mui/material';

const basicFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
];

export default function makeTheme() {
  return createTheme({
    palette: {
      mode: 'dark'
    },
    shape: { borderRadius: 12 },
    typography: {
      button: {
        textTransform: 'none'
      },
      fontFamily: ['Poppins', ...basicFontStack].join(','),
      h1: { fontFamily: ['"Roboto Slab"', ...basicFontStack].join(','), fontWeight: 800 },
      h2: { fontFamily: ['"Roboto Slab"', ...basicFontStack].join(','), fontWeight: 700 },
      h3: { fontFamily: ['"Roboto Slab"', ...basicFontStack].join(','), fontWeight: 700 },
      h4: { fontFamily: ['"Roboto Slab"', ...basicFontStack].join(','), fontWeight: 600 },
      h5: { fontFamily: ['"Roboto Slab"', ...basicFontStack].join(','), fontWeight: 600 },
      h6: { fontFamily: ['"Roboto Slab"', ...basicFontStack].join(','), fontWeight: 600 },
      caption: { opacity: .77 }
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 32 }
        },
        defaultProps: { variant: 'contained', }
      },
      MuiListItemText: {
        styleOverrides: {
          secondary: { fontSize: '.8em' }
        }
      },
      MuiList: {
        styleOverrides: {
          root: { padding: 0 }
        }
      },
    },
  })
}