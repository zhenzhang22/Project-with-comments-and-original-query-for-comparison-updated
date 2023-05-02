import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material'
import { indigo, amber } from '@mui/material/colors'
import { createTheme } from "@mui/material/styles";

import NavBar from './components/NavBar';
import Storeinfo from './pages/Storeinfo';
import HomePage from './pages/HomePage';
import SalesByDate from './pages/SalesByDate';
import Weather from './pages/Weather';
import SalesByFamily from './pages/SalesByFamily';

export const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: amber,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/Storeinfo" element={<Storeinfo />} />
          <Route path="/SalesByDate" element={<SalesByDate />} />
          <Route path="/weatherbycitybydate" element={<Weather />} />
          <Route path="/salesbyfamily_search" element={<SalesByFamily />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}