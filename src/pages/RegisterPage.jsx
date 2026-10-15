import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateFullName
} from "../utils/validation";

function RegisterPage() {
  const { register, checkUsername } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    avatar: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    let error = "";

    if (name === "username") {
      error = validateUsername(value);
    }

    if (name === "fullName") {
      error = validateFullName(value);
    }

    if (name === "email") {
      error = validateEmail(value);
    }

    if (name === "password") {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
      server: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateUsername(form.username),
      fullName: validateFullName(form.fullName),
      email: validateEmail(form.email),
      password: validatePassword(form.password)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      setLoading(true);

      const usernameExists = await checkUsername(form.username);

      if (usernameExists) {
        setErrors({
          username: "Username already exists"
        });
        return;
      }

      await register(form);
      navigate("/dashboard");
    } catch (error) {
      setErrors({
        server: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-200 ${
      errors[name]
        ? "border-red-500 focus:border-red-500"
        : form[name]
        ? "border-green-500 focus:border-green-500"
        : "border-gray-300 focus:border-blue-500"
    }`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg rounded-2xl bg-white p-7 shadow-xl sm:p-9"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your details to get started
          </p>
        </div>

        {errors.server && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errors.server}
          </p>
        )}

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Username
          </label>

          <input
            name="username"
            placeholder="Choose a username"
            value={form.username}
            onChange={handleChange}
            className={inputClass("username")}
          />

          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Full name
          </label>

          <input
            name="fullName"
            placeholder="Your full name"
            value={form.fullName}
            onChange={handleChange}
            className={inputClass("fullName")}
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email address
          </label>

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass("email")}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="At least 6 characters"
              value={form.password}
              onChange={handleChange}
              className={`${inputClass("password")} pr-16`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Avatar URL (optional)
          </label>

          <input
            name="avatar"
            placeholder="https://example.com/photo.jpg"
            value={form.avatar}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;