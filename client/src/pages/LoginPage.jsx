import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Elevation } from "@blueprintjs/core";

import { Colors } from "@blueprintjs/core";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import translations from "../assets/translations";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const [showPassword, setShowPassword] = useState(false);

  const { isDarkMode } = useTheme();

  const { language } = useLanguage();
  const words = translations[language] || translations["english"];

  return (
    <div
      style={isDarkMode ? { background: Colors.DARK_GRAY1 } : { background: Colors.LIGHT_GRAY3 }}
      className="flex items-center justify-center h-[calc(100vh)]"
    >
      <Card
        interactive={false}
        elevation={Elevation.TWO}
        className="max-w-md w-full p-10 rounded-md space-y-2"
      >
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-1 my-1 text-xs text-white text-center rounded-md" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-thin pb-4">{words.login}</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="bp5-input-group bp5-large flex items-center">
            <span className="bp5-icon bp5-icon-at" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder={words.email}
              className="bp5-input bp5-fill bp5-large"
              dir="auto"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs">{words.emailRequired}</p>}
          <div className="bp5-input-group bp5-large flex items-center">
            <span className="bp5-icon bp5-icon-key" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder={words.password}
              className="bp5-input bp5-fill bp5-large"
              dir="auto"
            />
            <Button
              icon={showPassword ? "unlock" : "lock"}
              className="bp5-button bp5-minimal bp5-intent-warning"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          </div>
          {errors.password && <p className="text-red-500 text-xs">{words.passwordRequired}</p>}
          <Button icon="user" intent="success" type="submit">
            {words.login}
          </Button>
        </form>
        <p className="flex gap-x-2 justify-between items-center">
          {words.noAccount}
          <Link to="/register" className="bp5-button bp5-intent-primary bp5-icon-log-in">
            {words.signUp}
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;
