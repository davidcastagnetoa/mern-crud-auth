import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button, ButtonGroup, Navbar, NavbarHeading } from "@blueprintjs/core";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import translations from "../assets/translations";

function NavigationBar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  console.log("in NavBar.jsx, user data recorvery is :" + JSON.stringify(user));

  const { language } = useLanguage();
  const words = translations[language] || translations["english"];

  return (
    <Navbar className="bp5-navbar flex justify-between items-center py-2 fixed">
      <NavbarHeading className="bp5-navbar-heading">
        <Link
          to={isAuthenticated ? "/tasks" : "/"}
          className="bp5-button bp5-icon-home bp5-large outline-none mr-2"
        ></Link>
        {words.taskManager}
      </NavbarHeading>
      <ul className="flex gap-x-2 items-center">
        {isAuthenticated ? (
          <>
            <li>
              {words.welcome} {user.firstName}
            </li>
            <span className="bp5-navbar-divider"></span>
            <li>
              <Link to="/add-task" className="bp5-button bp5-icon-document outline-none">
                {words.addTask}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="bp5-button bp5-intent-danger bp5-icon-log-out outline-none"
              >
                {words.logout}
              </Link>
            </li>
            <span className="bp5-navbar-divider"></span>
            <ButtonGroup>
              <Link to="/profile" className="bp5-button bp5-icon-user outline-none" />
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
                onClick={toggleDarkMode}
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
                {words.login}
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bp5-button bp5-icon-user outline-none px-4 py-1 rounded-sm"
              >
                {words.register}
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
                onClick={toggleDarkMode}
              />
            </ButtonGroup>
          </>
        )}
      </ul>
    </Navbar>
  );
}

export default NavigationBar;
