import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Elevation } from "@blueprintjs/core";

import { Colors } from "@blueprintjs/core";
import { useTheme } from "../context/ThemeContext";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  const password = watch("password");

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  const [showPassword, setShowPassword] = useState(false);
  const { isDarkMode } = useTheme();

  return (
    <div
      className="flex items-center justify-center h-[calc(100vh)]"
      style={isDarkMode ? { background: Colors.DARK_GRAY1 } : { background: Colors.LIGHT_GRAY3 }}
    >
      <Card
        interactive={false}
        elevation={Elevation.TWO}
        className="max-w-md w-full p-10 rounded-md space-y-2"
      >
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 my-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-thin pb-4">Register</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-person" />
            <input
              type="text"
              {...register("username", { required: true })}
              placeholder="Username"
              className="bp5-input bp5-fill"
            />
            {errors.username && <p className="text-red-500">Username is required</p>}
          </div>

          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-at" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="bp5-input bp5-fill w-full"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-key" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
              className="bp5-input bp5-fill w-full"
            />
            <Button
              icon={showPassword ? "unlock" : "lock"}
              className="bp5-button bp5-minimal bp5-intent-warning"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            />
          </div>
          {errors.password && <p className="text-red-500">Password is required</p>}

          <div className="bp5-input-group bp5-large">
            <span className="bp5-icon bp5-icon-key" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: true,
                validate: (value) => value === password,
              })}
              placeholder="Confirm Password"
              className="bp5-input bp5-fill w-full"
            />
            <Button
              icon={showPassword ? "unlock" : "lock"}
              className="bp5-button bp5-minimal bp5-intent-warning"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            ></Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500">New Password is different of Password</p>
          )}

          <Button icon="user" intent="success" type="submit">
            Register
          </Button>
        </form>
        <p className="flex gap-x-2 items-center justify-between">
          Already have an account?
          <Link to="/login" className="bp5-button bp5-intent-primary bp5-icon-log-in">
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default RegisterPage;
