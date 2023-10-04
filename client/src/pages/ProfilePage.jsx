import React from "react";
import { Colors } from "@blueprintjs/core";
import { Button, Card, Elevation } from "@blueprintjs/core";
import { useAuth } from "../context/AuthContext";

function ProfilePage() {
  const { isAuthenticated, user, logout } = useAuth();
  console.log("in ProfilePage.jsx, user data recorvery is :" + JSON.stringify(user));

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  return (
    <div
      className="flex items-center justify-center h-[calc(100vh)]"
      style={{ background: Colors.DARK_GRAY1 }}
    >
      {/* <div style={{ background: Colors.DARK_GRAY1 }}> */}
      <Card
        interactive={false}
        elevation={Elevation.TWO}
        className="bp5-dark max-w-2xl w-full p-10 rounded-md space-y-2"
      >
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.language}</p>
        <p>{formatDate(user.birthDate)}</p>
        <p>{user.city}</p>
        <p>{user.country}</p>
        <p>{user.avatar}</p>
        <img src={user.avatar} alt="avatar" />
      </Card>
      {/* </div> */}
    </div>
  );
}

export default ProfilePage;
