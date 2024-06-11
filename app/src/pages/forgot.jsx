import React from "react";

function Forgot() {
  return (
    <div className="login-body flex-col py-32">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mt-12 mx-auto h-10 w-auto" src="src/img/logo.png" />
      </div>
      <h1 className="mt-9 text-white text-center text-2xl font-bold">
        Forgot Password
      </h1>
      <div className="mt-9 bg-white px-10 py-20 rounded-lg sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label htmlFor="email" className="text-sx font-medium">
              Email address
            </label>
            <input
              className="p-2 mt-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="mt-6">
            <button className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 ">
              Continue
            </button>
          </div>
        </form>
        <p className="mt-1 text-center text-sm text-gray-500">
          Back to login page?{" "}
          <a
            href="/"
            className="font-semibold leading-6 text-red-600 hover:text-red-500"
          >
            Click here
          </a>
        </p>
        
      </div>
      
    </div>
  );
}
export default Forgot;
