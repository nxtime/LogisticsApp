import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { IUser, authStore } from "../../stores/Auth.store";
import { gql, useQuery } from "urql";
import axios from "axios";

const query = gql`
  query User($userId: String!) {
    find(userId: $userId) {
      id
      name
      email
      role
    }
  }
`;

const Login = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange"
  });

  const submitHandler = async (data: any) => {
    try {
      const { data: user, status } = await axios({
        method: "POST",
        url: "http://localhost:5500/login",
        data: {
          email: data.email,
          password: data.password
        }
      });

      console.log(status);

      if (status !== 200) {
        alert("Invalid credentials");
      }

      authStore.login(user!);
      reset();
    } catch (error) {
      alert("Invalid credentials");
      console.log(error);
    }

    // const user: IUser = {
    //   avatar: "https://i.pravatar.cc/150?img=1",
    //   name: "John Doe",
    //   email: String(data.email),
    //   id: "1",
    //   role: "admin"
    // };
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Login</h1>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-4 justify-center text-center"
      >
        <input
          type="email"
          placeholder="Email"
          className="input"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email"
            }
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">
            {String(errors.email.message)}
          </span>
        )}
        <input
          type="password"
          placeholder="Password"
          className="input"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {String(errors?.password?.message)}
          </span>
        )}
        <button type="submit" className="btn btn-primary" disabled={!isValid}>
          Login
        </button>
      </form>
      <div>
        <div className="flex justify-center mt-4">
          <span>Don't have an account?</span>
          <Link to="/register" className="ml-2 text-blue-500">
            Register
          </Link>
        </div>

        <div className="flex justify-center mt-4">
          <span>Forgot your password?</span>
          <Link to="/forgot-password" className="ml-2 text-blue-500">
            Reset password
          </Link>
        </div>
        <span className="divider">OR</span>
        <div className="flex items-center gap-4 justify-center mt-4">
          <span>Login with:</span>
          <div className="flex gap-4">
            <button className="btn btn-primary">Google</button>
            <button className="btn btn-primary">Facebook</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
