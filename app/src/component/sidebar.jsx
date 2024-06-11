import React from "react";

function Sidebar() {

  const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/"; 
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-900 p-4 rounded-r-xl">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex items-center pd-4 border-b border-b-gray-700">
          {/* <img className="h-10 w-10 ml-2" src="src/img/logo.png" alt="Logo" /> */}
          <span className="text-lg font-bold text-white ml-2 mb-2">MENU</span>
        </div>
        <ul className="mt-1">
          <li className="mb-1 ">
            <a
              href="/Home"
              className="flex mt-5 item-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-xl"
            >
              <i class="ri-bar-chart-box-line mr-3 text-lg"></i>
              <span className="text-lg">Dashboard</span>
            </a>
          </li>
          <li className="mb-1 ">
            <a
              href="/order"
              className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md"
            >
              <i class="ri-handbag-line mr-3 text-lg"></i>
              <span className="text-lg">Orders</span>
            </a>
          </li>
          <li className="mb-1">
            <a
              href="/products"
              className="flex  item-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-xl"
            >
              <i class="ri-archive-line mr-3 text-lg"></i>
              <span className="text-lg">Products</span>
            </a>
          </li>
          <li className="mb-1">
            <a
              href="/employee"
              className="flex  item-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-xl"
            >
              <i class="ri-team-line mr-3 text-lg"></i>
              <span className="text-lg">Employee</span>
            </a>
          </li>
          <li className="mb-1">
            <a
              href="/customer"
              className="flex  item-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-xl"
            >
              <i class="ri-user-line mr-3 text-lg"></i>
              <span className="text-lg">Customer</span>
            </a>
          </li>
          <li className="mb-1">
            <a
               href="#"
               className="flex  item-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-xl"
               onClick={handleLogout}
            >
              <i class="ri-logout-box-line mr-3 text-lg"></i>
              <span className="text-lg">Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
