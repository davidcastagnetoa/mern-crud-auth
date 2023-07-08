import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RegisterPage() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="bg-zinc-800 max-w-md p-10">
      <form
        onSubmit={handleSubmit(async (values) => {
          console.log(values);
          // const response = await registerRequest(values);
          // console.log(response);
          registerRequest(values);
        })}
        className="space-y-4"
      >
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
