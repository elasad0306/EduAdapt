import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home'
import Registration from './pages/Registration';
import Connexion from './pages/Connexion';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Registration' element={<Registration/>}/>
        <Route path='/Connexion' element={<Connexion/>}/>
      </Routes>
    </Router>
  )
}

export default App
