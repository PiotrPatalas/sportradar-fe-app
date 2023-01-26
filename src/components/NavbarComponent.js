import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavbarComponent = () =>{
  return (
    <Navbar expand="lg" variant="light" bg="primary">
      <Container>
        <Navbar href="#">Sportradar_Academy FE test</Navbar>
      </Container>
    </Navbar>
  );
}
export default NavbarComponent;
