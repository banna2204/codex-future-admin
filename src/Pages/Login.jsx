import React, { useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = ({setIsLogin}) => {

  const [form, setForm] = useState({email:'',password:''})
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!form.email || !form.password) return toast.error('Please fill all fields!!')

      const res = await axios.post('https://codex-future.onrender.com/api/admin/adminLogin',form);
      
      if(res.data.message){
        toast.success('Successfully Authenticate!!');
        setIsLogin(true);
        navigate('/allcourse')
      }else{
        toast.error('Credentials Wrong!!');
        setForm({email:'',password:''})
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className=" md:w-1/2 w-full max-w-md flex flex-col items-center gap-9 border border-gray-300 px-6 md:px-12 py-10 rounded-lg">
        <h2 className="text-2xl py-3 font-semibold">Authenticate Yourself</h2>
        <input
          type="email"
          onChange={handleChange}
          name="email"
          value={form.email}
          placeholder="Enter Email"
          className="border border-gray-300 p-2 rounded-md w-full outline-none"
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={form.password}
          placeholder="Enter Password"
          className="border border-gray-300 p-2 rounded-md w-full outline-none"
        />

        <button type="submit" className="p-2 bg-slate-900 hover:bg-black border-none text-white w-full rounded-lg ">
          Authenticate
        </button>
      </form>
    </div>
  );
};

export default Login;
