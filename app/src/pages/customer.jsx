import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../component/sidebar";
import EditCustomer from "../component/editcustomer";
import DeleteCustomer from "../component/deletecustomer";

function Customer() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customerPerPage] = useState(10);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:8081/getcustomer")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.log(err));
  };

  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.customers_first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customers_last.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customers_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customers_username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredCustomers.length / customerPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleEdit = (customerId) => {
    setSelectedCustomerId(customerId);
    toggleEditModal();
  };

  const handleDelete = (customerId) => {
    setSelectedCustomerId(customerId);
    toggleDeleteModal();
  };

  return (
    <div>
      <Sidebar />
      <div>
        <main className="bg-gray-50 min-h-screen">
          <h1 className="pl-80 pt-5 text-2xl font-bold text-black">Customer</h1>
          <div className="pl-80 pt-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl">
              <div className="flex items-center">
                <p className="text-lg font-medium text-gray-800 mr-4">
                  Customer information lists
                </p>
                <form className="flex-grow max-w-3xl">
                  <label
                    htmlFor="default-search"
                    className="mb-1 text-lg font-medium text-gray-900 sr-only dark:text-white"
                  >
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <i className="ri-search-line text-gray-500"></i>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50"
                      placeholder="Search for customers"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-6 py-2"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-5 shadow-md">
                <table className="w-full text-sm text-left text-white">
                  <thead>
                    <tr className="bg-gray-900">
                      <th scope="col" className="px-6 py-3">
                        No.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        NAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        USERNAME
                      </th>
                      <th scope="col" className="px-6 py-3">
                        CONTACT
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full text-sm text-left text-black">
                    {filteredCustomers.map((customer, index) => (
                      <tr className="border-b dark:bg-gray-800" key={index}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900"
                        >
                          {index + 1}
                        </th>
                        <td className="px-6 py-4">{customer.customers_first} {customer.customers_last}</td>
                        <td className="px-6 py-4">{customer.customers_username}</td>
                        <td className="px-6 py-4">{customer.customers_email}</td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="font-medium text-blue-600 hover:underline"
                            onClick={() => handleEdit(customer.customers_id)}
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="font-medium ml-2 text-red-600 hover:underline"
                            onClick={() => handleDelete(customer.customers_id)}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <nav className="flex justify-center mt-4 ">
            <ul className="inline-flex items-center -space-x-px text-sm">
              <li>
                <a
                  href="#"
                  onClick={previousPage}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              {[...Array(Math.ceil(filteredCustomers.length / customerPerPage)).keys()].map((number) => (
                <li key={number}>
                  <a
                    onClick={() => paginate(number + 1)}
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      currentPage === number + 1
                        ? "text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700"
                        : "text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  >
                    {number + 1}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#"
                  onClick={nextPage}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </main>
      </div>
      {isEditModalOpen && (
        <EditCustomer
          isModalOpen={isEditModalOpen}
          toggleModal={toggleEditModal}
          customerId={selectedCustomerId}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteCustomer
          isModalOpen={isDeleteModalOpen}
          toggleModal={toggleDeleteModal}
          customerId={selectedCustomerId}
          onDeleteSuccess={fetchCustomers}
        />
      )}
    </div>
  );
}

export default Customer;
