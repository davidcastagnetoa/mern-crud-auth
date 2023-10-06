import React from "react";
import { Colors } from "@blueprintjs/core";

import { Card, Button, Elevation, Icon } from "@blueprintjs/core";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import translations from "../assets/translations";

function ProfilePage() {
  const { user } = useAuth();
  const { avatar, birthDate, city, country, email, firstName, lastName, username } = user;
  console.log("in ProfilePage.jsx, user data recorvery is :" + JSON.stringify(user));

  const { language } = useLanguage();
  const words = translations[language] || translations["english"];

  const { isDarkMode } = useTheme();

  return (
    <div
      className="bp5-fill flex items-center justify-center h-[calc(100vh)]"
      style={isDarkMode ? { background: Colors.DARK_GRAY1 } : { background: Colors.LIGHT_GRAY3 }}
    >
      <Card elevation={Elevation.TWO} className="bp5-card flex flex-col items-center">
        <span className="text-2xl w-full">{words.flag}</span>
        <div className="text-center">
          <div className="flex justify-center">
            <img
              className="rounded-full w-24 h-24 my-2"
              src={avatar}
              alt={`${firstName} ${lastName}`}
            />
          </div>
        </div>

        <div className="p-5 flex flex-col items-center">
          <h3 className="bp5-heading mb-1">{`${firstName} ${lastName}`}</h3>
          <p className="bp5-text-large">
            <strong>{`@${username}`}</strong>
          </p>
          <p className="bp5-text-muted">{`${new Date(birthDate).toLocaleDateString()}`}</p>
          <p className="bp5-text-muted">{`${city}`}</p>
          <p className="bp5-text-muted">{`${country}`}</p>
          <div className="flex items-center">
            <p className="bp5-text-muted">{`${email}`}</p>
            <Button minimal icon="envelope" className="bp5-button outline-none" />
          </div>
        </div>

        <div className="flex justify-evenly w-full">
          <Link
            to="/tasks"
            className="bp5-button bp5-icon-confirm bp5-intent-success m-1 outline-none"
          >
            {words.tasks}
          </Link>
          <Button
            className="bp5-button m-1 outline-none"
            icon="edit"
            minimal={false}
            large={false}
            disabled={true}
          >
            {words.edit}
          </Button>
        </div>
      </Card>
      {/* </div> */}
    </div>
  );
}

export default ProfilePage;
