import { Routes, Route} from "react-router-dom";
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Orders from "./Pages/Orders/Orders";
function App() {
 
 const url="http://localhost:5000"
  return (
    <div>
    <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
        </Routes>
      </div>
      
    </div>
  )
}

export default App
