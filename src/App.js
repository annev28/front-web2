import Home from './components/Home';
import Sobre from './components/Sobre';
import Consultas from './components/Consultas';
import { BrowserRouter,  Routes, Link, Route } from 'react-router-dom';
import {Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <h1>AGENDAMENTO DE CONSULTAS</h1>
      <BrowserRouter>

      <Nav variant="tabs">
        <Nav.Link as={Link} to="/">Página Inicial</Nav.Link>
        <Nav.Link as={Link} to="/consultas">Cadastro de Consultas</Nav.Link>
        <Nav.Link as={Link} to="/sobre">Sobre</Nav.Link>
      </Nav>

      <Routes>
        <Route path="/" elements={<Home/>}></Route>
        <Route path="/consultas" element={<Consultas/>}></Route>
        <Route path="/sobre" elements={<Sobre/>}></Route>
      
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
