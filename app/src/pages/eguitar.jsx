import React, { useState } from "react";
import Sidebar from "../component/sidebar";
import Empmodel from "../component/empmodel";
import Editmodel from "../component/editmodel";
import Delectmodel from "../component/delectmodel";

function Eguitar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDelectModalOpen, setIsDelectModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const toggleDelectModal = () => {
    setIsDelectModalOpen(!isDelectModalOpen);
  };

  return (
    <div>
      <Sidebar />
      <div>
        <main className="bg-gray-50 min-h-screen">
          <h1 className="pl-80 pt-5 text-2xl font-bold text-black">Electric Guitar</h1>
          <div className="pl-80 pt-6">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl">
              <div className="flex items-center">
                <p className="text-lg font-medium text-gray-800 mr-4">
                  Electric Guitar Products information lists
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
                      placeholder="Search for products"
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
              </div>
              {/* modal */}
              <Empmodel isModalOpen={isModalOpen} toggleModal={toggleModal} />
              {/* modal */}
              {/* main */}
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
                        PRICE
                      </th>
                      <th scope="col" className="px-6 py-3">
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full text-sm text-left text-black">
                    <tr className="border-b dark:bg-gray-800">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900"
                      >
                        aa
                      </th>
                      <td className="px-6 py-4">aa</td>
                      <td className="px-6 py-4">aa</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 hover:underline"
                          onClick={toggleEditModal}
                        >
                          Edit
                        </a>
                        <Editmodel
                          isModalOpen={isEditModalOpen}
                          toggleModal={toggleEditModal}
                        />
                        <a
                          href="#"
                          onClick={toggleDelectModal}
                          className="font-medium ml-2 text-red-600 hover:underline"
                        >
                          Delect
                        </a>
                        <Delectmodel
                          isModalOpen={isDelectModalOpen}
                          toggleModal={toggleDelectModal}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* nav */}
          <nav></nav>
          {/* nav */}
        </main>
      </div>
    </div>
  );
}
export default Eguitar;
