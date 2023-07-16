import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md space-y-2">
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-1 my-1 text-xs text-white text-center rounded-md" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit} className="space-y-2.5">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-xs">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-xs">Password is required</p>}
          <button type="submit">Login</button>
        </form>
        <p className="flex gap-x-2 justify-between">
          Don't have an account?
          <Link to="/register" className="text-blue-500 ">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
