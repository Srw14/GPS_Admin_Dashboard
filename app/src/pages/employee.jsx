import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../component/sidebar";
import Empmodel from "../component/empmodel";
import Editmodel from "../component/editmodel";
import Delectmodel from "../component/delectmodel";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalState, setModalState] = useState({
    isModalOpen: false,
    isEditModalOpen: false,
    isDelectModalOpen: false,
    employeeId: null,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8081/getemployee")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  const toggleModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  const toggleEditModal = (id) => {
    setModalState((prevState) => ({
      ...prevState,
      employeeId: id,
      isEditModalOpen: !prevState.isEditModalOpen,
    }));
  };

  const toggleDelectModal = (id) => {
    setModalState((prevState) => ({
      ...prevState,
      employeeId: id,
      isDelectModalOpen: !prevState.isDelectModalOpen,
    }));
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.user_first.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.user_last.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.user_position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.user_phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.user_address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Sidebar />
      <div>
        <main className="bg-gray-50 min-h-screen">
          <h1 className="pl-72 pt-5 text-2xl font-bold text-black">Employee</h1>
          <div className="pl-72 pt-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl">
              <div className="flex items-center">
                <p className="text-lg font-medium text-gray-800 mr-4">
                  Employee information lists
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
                      placeholder="Search for users"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      Search
                    </button>
                  </div>
                </form>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-12 py-3 ml-5"
                >
                  Add
                </button>
              </div>
              <Empmodel isModalOpen={modalState.isModalOpen} toggleModal={toggleModal} />
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
                        POSITION
                      </th>
                      <th scope="col" className="px-6 py-3">
                        CONTACT
                      </th>
                      <th scope="col" className="px-6 py-3">
                        EMAIL
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ADDRESS
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full text-sm text-left text-black">
                    {currentEmployees.map((employee, index) => (
                      <tr className="border-b dark:bg-gray-800" key={index}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900"
                        >
                          {indexOfFirstEmployee + index + 1}
                        </th>
                        <td className="px-6 py-4">{employee.user_first} {employee.user_last}</td>
                        <td className="px-6 py-4">{employee.user_position}</td>
                        <td className="px-6 py-4">{employee.user_phone}</td>
                        <td className="px-6 py-4">{employee.user_email}</td>
                        <td className="px-6 py-4">{employee.user_address}</td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            className="font-medium text-blue-600 hover:underline"
                            onClick={() => toggleEditModal(employee.user_id)}
                          >
                            Edit
                          </a>
                          <Editmodel
                            isModalOpen={
                              modalState.isEditModalOpen && modalState.employeeId === employee.user_id
                            }
                            toggleModal={() =>
                              toggleEditModal(employee.user_id)
                            }
                            employeeId={employee.user_id}
                          />
                          <a
                            href="#"
                            onClick={() => toggleDelectModal(employee.user_id)}
                            className="font-medium ml-2 text-red-600 hover:underline"
                          >
                            Delete
                          </a>
                          <Delectmodel
                            isModalOpen={
                              modalState.isDelectModalOpen &&
                              modalState.employeeId === employee.user_id
                            }
                            toggleModal={() =>
                              toggleDelectModal(employee.user_id)
                            }
                            employeeId={employee.user_id}
                          />
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
              {[...Array(Math.ceil(filteredEmployees.length / employeesPerPage)).keys()].map((number) => (
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
    </div>
  );
}

export default Employee;
