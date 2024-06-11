import React, { useEffect, useState } from "react";
import Sidebar from "../component/sidebar";
import axios from "axios";

function Home() {
  const [auth, setAuth] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');

  useEffect(() => {
    const userFirst = localStorage.getItem('user_first');
    if (userFirst) {
      setUserFirstName(userFirst);
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <div>
      <Sidebar />
      {auth && (
        <div>
          <h1 className="pl-80 mt-5 text-2xl font-bold text-black">
            Dashboard {userFirstName}
          </h1>
        </div>
      )}
    </div>
  );
}

export default Home;
