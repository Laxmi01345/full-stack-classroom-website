import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login'
import Signup from './components/Signup'
import PrDash from './components/PrDash';
import TeachDash from './components/TeachDash';
import StudDash from './components/StudDash';
function App() {

 
  return (
    <>
    

    <BrowserRouter>
    <ToastContainer /> 
    <Routes>
      <Route  path="/" element={<Login/>} />
      <Route  path="signup" element={<Signup/>} />
      <Route  path="/PrDash" element={<PrDash/>} />
      <Route  path="/StudDash" element={<StudDash/>} />
      <Route  path="/TeachDash" element={<TeachDash/>} />
    </Routes>
    
    </BrowserRouter>
    
      
    </>
  )
}

export default App
