import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user);

  return (
    <nav className="bp5-navbar bp5-dark flex justify-between items-center py-2">
      <h3 className="text-xl text-white">
        <Link
          to={isAuthenticated ? "/tasks" : "/"}
          className="bp5-button bp5-icon-home bp5-large no-underline hover:no-underline mr-2"
        ></Link>
        Task Manager
      </h3>
      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <span className="bp5-navbar-divider"></span>
            <li>
              <Link
                to="/add-task"
                className="bp5-button bp5-icon-document outline-none"
              >
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
                className="bp5-button bp5-icon-log-in bg-indigo-500 outline-none px-4 py-1 rounded-sm"
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
  );
}

export default Navbar;
