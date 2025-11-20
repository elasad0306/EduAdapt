import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Home from './pages/Home'
import Registration from './pages/Registration';
import Connexion from './pages/Connexion';
import Chat from './pages/Chat';

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Registration' element={<Registration/>}/>
        <Route path='/Connexion' element={<Connexion/>}/>
          <Route path='/Chat' element={<Chat/>}/>
      </Routes>
    </Router>
  )
}

export default App
