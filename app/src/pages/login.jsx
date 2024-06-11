import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    user_pass: "",
    user_email: "",
  });

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/login', values)
      .then(res => {
        if (res.data.Status === "Success") {
          localStorage.setItem('user_first', res.data.user_first); 
          navigate('/home');
        } else {
          alert("Error: Invalid credentials");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login-body flex-col px-6 py-32">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mt-5 mx-auto h-10 w-auto" src="src/img/logo.png" alt="Logo" />
      </div>
      <h1 className="mt-6 text-white text-center text-2xl font-bold">
        Sign in to your account
      </h1>
      <div className="mt-6 bg-white px-10 py-20 rounded-lg w-32 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="sm:mx-auto sm:w-full sm:max-w-sm" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>
            <input
              className="p-2 mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) =>
                setValues({ ...values, user_email: e.target.value })
              }
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              className="p-2 mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              onChange={(e) =>
                setValues({ ...values, user_pass: e.target.value })
              }
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
