
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'jquery/dist/jquery.js';
import './App.css';
import {createBrowserRouter,RouterProvider}from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Partic from './components/partic';

const routes =createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true, element:<Login/>},
    {path:'register',element:<Register/>},
    {path:'home',element:(<ProtectedRoute><Home/></ProtectedRoute>)},
    {path:'*',element:<Login/>},

  ]}
]);

function App() {
  return (
    <>
    
    <RouterProvider router={routes}/>
    <Partic/>
    </>
  );
}

export default App;
