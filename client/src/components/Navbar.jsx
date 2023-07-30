import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, ButtonGroup } from "@blueprintjs/core";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log(user);

  return (
    <nav className="bp5-navbar bp5-dark flex justify-between items-center py-2 fixed">
      <h3 className="text-xl text-white">
        <Link
          to={isAuthenticated ? "/tasks" : "/"}
          className="bp5-button bp5-icon-home bp5-large outline-none mr-2"
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
                className="bp5-button bp5-intent-danger bp5-icon-log-out outline-none"
              >
                Logout
              </Link>
            </li>
            <span className="bp5-navbar-divider"></span>
            <ButtonGroup>
              <Button
                icon="user"
                minimal={false}
                large={false}
                disabled={true}
                className="bp5-button outline-none"
              />
              <Button
                icon="notifications"
                minimal={false}
                large={false}
                disabled={true}
                className="bp5-button outline-none"
              />
              <Button
                icon="flash"
                minimal={false}
                large={false}
                className="bp5-button outline-none"
              />
            </ButtonGroup>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="bp5-button bp5-icon-log-in outline-none px-4 py-1 rounded-sm"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bp5-button bp5-icon-user outline-none px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
            <span className="bp5-navbar-divider"></span>
            <ButtonGroup>
              <Button
                icon="wrench"
                minimal={false}
                large={false}
                disabled={true}
                className="bp5-button outline-none"
              />
              <Button
                icon="flash"
                minimal={false}
                large={false}
                className="bp5-button outline-none"
              />
            </ButtonGroup>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
