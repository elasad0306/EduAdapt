import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home'
// import Connexion from './pages/Connexion';
import Registration from './pages/Registration';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Inscription' element={<Registration/>}/>
      </Routes>
    </Router>
  )
}

export default App
