import { BrowserRouter as Router, Route, Link, BrowserRouter } from 'react-router-dom';
import Routes from './Routes'
import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
