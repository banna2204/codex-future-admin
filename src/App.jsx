import React from 'react'
import Course from './Pages/Course'
import { Toaster } from "react-hot-toast";
import {Routes,Route, Navigate} from 'react-router-dom';
import AllCourse from './Pages/AllCourse';
import Header from './Pages/Header';
import Feedback from './Pages/Feedback';
import Address from './Pages/Address';
import Placed from './Pages/Placed';
import Login from './Pages/Login';
import { useState } from 'react';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Toaster position="top-center" />
      <Header/>
      <div className='w-full '>
      <Routes>
        <Route path="/" element={!isLogin ? 
            ( <Login isLogin={isLogin} setIsLogin={setIsLogin} />
            ) : (
              <Navigate to="/allcourse" replace />
            )
          }
        />

        <Route path="/allcourse" element={isLogin ? 
            ( <AllCourse />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/courses" element={isLogin ?
            (
              <Course />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/feedback" element={isLogin ? 
            (
              <Feedback />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/address" element={isLogin ? 
            (
              <Address />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route path="/placed" element={ isLogin ? 
            (
              <Placed />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
      </div>
    </>
  )
}

export default App
