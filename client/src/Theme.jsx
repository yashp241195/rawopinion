import { createTheme, } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: blue[700],
      },
      online: {
        main: green[500],
      },
    },
});
  
export default theme