import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const { signup, isAuthenticated } = useAuth();
  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="bg-zinc-800 max-w-md p-10">
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
