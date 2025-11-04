import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosinstance'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import toast from 'react-hot-toast'



const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return;
    }
    if (!password) {
      setError("Please enter the password")
      return;
    }
    setError("")
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("Token", token);
        updateUser(response.data)
        toast.success("Login successful!", { duration: 6000 });
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
        toast.error(error.response.data.message);
      }
      else {
        setError("Something went wrong.Please try again.")
        toast.error("Something went wrong.Please try again.");
      }
    }
  }
  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center '>
      <h3 className='text-lg font-semibold text-black'>Welcome Back!</h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-6 '>Enter your details to login</p>

      
      <form onSubmit={handleLogin}>
        <Input value={email} onChange={({ target }) => setEmail(target.value)} label="Email Address" placeholder="john@email.com" type="text" />
        <Input value={password} onChange={({ target }) => setPassword(target.value)} label="Password" placeholder="Minimum 8 Characters " type="password" />
        {error && <p className="text-red-400 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don’t have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}
          >
            SignUp
          </button>
        </p>

      </form>
    </div>
  )
}

export default Login