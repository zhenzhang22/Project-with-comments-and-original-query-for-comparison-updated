import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { NavLink } from 'react-router-dom';

// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
const NavText = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? 'h5' : 'h7'}
      noWrap
      style={{
        marginRight: '30px',
        fontFamily: 'arial',
        fontWeight: 700,
      }}
    >
      <NavLink
        to={href}
        style={{
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {text}
      </NavLink>
    </Typography>
  )
}


// Here, we define the NavBar. Note that we heavily leverage MUI components
// to make the component look nice. Feel free to try changing the formatting
// props to how it changes the look of the component.
export default function NavBar() {
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/e/e8/Flag_of_Ecuador.svg'} href="https://en.wikipedia.org/wiki/Ecuador" className="img-fluid" alt="pic" width="5%" hspace="20"/>
          <NavText href='/' text='Retail Sale Analysis' isMain />
          <NavText href='/storeinfo' text='Store Information' />
          <NavText href='/salesbydate' text='Sales by Date' />
          <NavText href='/weatherbycitybydate' text='Sales by Weather' />
          <NavText href='/salesbyfamily_search' text='Sales by Family' />
        </Toolbar>
      </Container>
    </AppBar>
  );
}