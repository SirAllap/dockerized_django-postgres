/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  // Determine if the form is for login or registration
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic form validation
    if (!email || !password || (method !== "login" && !username)) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Prepare data payload based on the method
    const data =
      method === "login" ? { email, password } : { username, email, password };

    try {
      // Send data to the specified API route
      const res = await api.post(route, data);

      if (method === "login") {
        // Save tokens if the login is successful
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/"); // Redirect to home
      } else {
        // Redirect to login after registration
        navigate("/login");
      }
    } catch (error) {
      // Display the error message to the user
      // alert("An error occurred. Please check your input and try again.");
      console.error("Error:", error);
      if (error.response.data.email)
        setEmailError(error.response.data.email[0]);
      if (error.response.data.password)
        setPasswordError(error.response.data.password[0]);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full form-container border-2 text-[#575757] dark:text-white "
      >
        <h1 className="font-extrabold text-xl py-5">{name}</h1>
        {emailError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 my-2 ml-2 px-2 py-2 rounded-md relative w-full"
            role="alert"
          >
            <strong className="font-bold mr-10">{emailError}</strong>
            <span
              className="absolute top-0 bottom-0 right-0 px-2 py-2"
              onClick={() => setEmailError(null)}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}

        <input
          className="my-2 ml-2 px-2 py-2 w-full border border-indigo-300/40 bg-transparent rounded-md text-[#474747] dark:text-white error"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {method !== "login" && (
          <input
            className="my-2 ml-2 px-2 py-2 w-full border border-indigo-300/40 bg-transparent rounded-md text-[#474747] dark:text-white"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        )}

        {passwordError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 my-2 ml-2 px-2 py-2 rounded-md relative w-full"
            role="alert"
          >
            <strong className="font-bold mr-10">{passwordError}</strong>
            <span
              className="absolute top-0 bottom-0 right-0 px-2 py-2"
              onClick={() => setPasswordError(null)}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        <input
          className="my-2 ml-2 px-2 py-2 w-full border border-indigo-300/40 bg-transparent rounded-md text-[#474747] dark:text-white"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <p className="my-8">
          {method === "login"
            ? "Haven't registered yet? "
            : "Already registered? "}
          {method === "login" ? (
            <span
              className="text-indigo-500 font-bold cursor-pointer hover:text-indigo-600"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          ) : (
            <span
              className="text-indigo-500 font-bold cursor-pointer hover:text-indigo-600"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          )}
        </p>
        <button
          className="border border-indigo-300 bg-indigo-500 py-2 px-5 min-w-full text-white rounded-md hover:bg-transparent hover:text-indigo-500 transition-all duration-300"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : name}
        </button>
      </form>
    </section>
  );
};

export default Form;
