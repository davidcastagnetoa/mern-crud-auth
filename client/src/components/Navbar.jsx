import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user);

  return (
    <nav className="bp5-navbar bp5-dark flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">
        <Link
          to={isAuthenticated ? "/tasks" : "/"}
          className="bp5-button bp5-icon-home bp5-large no-underline hover:no-underline mr-2"
        ></Link>
        Task Manager
      </h1>
      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <span class="bp5-navbar-divider"></span>
            <li>
              <Link to="/add-task" className="bp5-button bp5-icon-document outline-none">
                Add Task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="bp5-button bp5-intent-danger bp5-icon-document outline-none"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bp5-button bp5-icon-user bg-indigo-500 outline-none px-4 py-1 rounded-sm"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bp5-button bp5-icon-user bg-indigo-500 outline-none px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
    // <nav className="bp5-navbar bp5-dark">
    //   <div style="margin: 0 auto; width: 480px;">
    //     <div className="bp5-navbar-group bp5-align-left">
    //       <div className="bp5-navbar-heading">Blueprint</div>
    //     </div>
    //     <div className="bp5-navbar-group bp5-align-right">
    //       <button className="bp5-button bp5-icon-home">Home</button>
    //       <button className="bp5-button bp5-icon-document">Files</button>
    //       <span className="bp5-navbar-divider"></span>
    //       <button className="bp5-button bp5-icon-user"></button>
    //       <button className="bp5-button bp5-icon-notifications"></button>
    //       <button className="bp5-button bp5-icon-cog"></button>
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Navbar;
