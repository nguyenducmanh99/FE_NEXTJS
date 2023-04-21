
import { createTheme } from '@mui/material';
import { Roboto } from "next/font/google";

export const roboto = Roboto({
    weight: "400",
    subsets: ["latin"],
});
  
export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
});
  
export const lightTheme = createTheme({
    palette: {
      mode: 'light',
    },
});