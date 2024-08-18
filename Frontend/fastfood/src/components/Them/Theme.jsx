import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Outfit',
    color:'red', // Add your desired font here
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
      fontFamily: 'Outfit',
    },
    TableRow:{
      color:'red',
    }
    // Add more typography variants as needed
  },
});

export default theme;
