import Carlist from "./components/Carlist"
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';


function App() {

  return (
    <>
    <Container maxWidth = "xl">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Car shop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </Container>
    </>
  )
}

export default App
