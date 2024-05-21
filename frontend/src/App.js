import MovieDetails from 'pages/MovieDetails';
import MovieEdit from 'pages/MovieEdit';
import React from 'react';
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/Authentication/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import AddMovie from './pages/AddMovie';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage';
import Movies from './pages/Movies';
import RegisterPage from 'pages/RegisterPage';


function App() {




  return (
    <>


      <div>
        <Navbar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeOnClick
          pauseOnFocusLoss
          draggable         
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<PrivateRoute Component={Movies}
            allowedRoles={['Admin', 'User']} />} />

          <Route path="/addmovie" element={<PrivateRoute Component={AddMovie}
            allowedRoles={['Admin']} />} />

          <Route path="/movie/:id" element={<PrivateRoute Component={MovieDetails}
            allowedRoles={['User', 'Admin']} />} />

          <Route path="/movie/edit/:id" element={<PrivateRoute Component={MovieEdit}
            allowedRoles={['Admin']} />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
