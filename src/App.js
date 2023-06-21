import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './page/register/Register';
import Home from './page/home/Home';
import Login from './page/login/Login';

function App() {
  const isAuth=localStorage.getItem("user");
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={isAuth?<Home/>:<Login/>}/>

      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
