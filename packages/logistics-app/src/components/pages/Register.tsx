import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange"
  });

  return (
    <>
      <h1 className="text-2xl font-bold">Register</h1>
      <input
        type="text"
        className="input"
        placeholder="Name"
        {...register("name", {
          required: "Nome is required",
          minLength: {
            value: 3,
            message: "Name needs to be at least 3 characters"
          }
        })}
      />
      <input
        type="email"
        className="input"
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email"
          }
        })}
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        {...register("password")}
      />
      <input
        type="password"
        className="input"
        placeholder="Confirm Password"
        {...register("confirm-password")}
      />
      <button type="submit" className="btn btn-primary" disabled={!isValid}>
        Register
      </button>

      <div className="flex gap-2 self-center">
        <span>Already have an account?</span>
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </div>
    </>
  );
};

export default Register;
