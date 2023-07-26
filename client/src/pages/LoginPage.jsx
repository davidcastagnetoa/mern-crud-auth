import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Card, Elevation } from "@blueprintjs/core";

import { Colors } from "@blueprintjs/core";

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

  return (
    <div
      style={{ background: Colors.DARK_GRAY1 }}
      className="flex items-center justify-center h-[calc(100vh-100px)]"
    >
      <Card
        interactive={false}
        elevation={Elevation.TWO}
        className="bp5-dark max-w-md w-full p-10 rounded-md space-y-2"
      >
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-1 my-1 text-xs text-white text-center rounded-md" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-thin pb-4">Login</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="bp5-input-group bp5-large flex items-center">
            <span className="bp5-icon bp5-icon-at" />
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="bp5-input bp5-fill bp5-large"
              dir="auto"
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
          <div className="bp5-input-group bp5-large flex items-center">
            <span className="bp5-icon bp5-icon-key" />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Password"
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
          {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
          <Button icon="user" intent="success" type="submit">
            Login
          </Button>
        </form>
        <p className="flex gap-x-2 justify-between items-center">
          Don't have an account?
          <Link to="/register" className="bp5-button bp5-intent-primary bp5-icon-log-in">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;
