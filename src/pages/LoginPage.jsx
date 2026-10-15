import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { validateEmail } from "../utils/validation";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
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

    setErrors((prev) => ({
      ...prev,
      [name]: name === "email" ? validateEmail(value) : "",
      server: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateEmail(form.email),
      password: form.password ? "" : "Password is required"
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      setLoading(true);
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ server: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl sm:p-10"
      >
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
            A
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to access your account
          </p>
        </div>

        {errors.server && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errors.server}
          </p>
        )}

        <label className="mb-1 block text-sm font-medium text-gray-700">
          Email address
        </label>

        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={`mb-2 w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-blue-200 ${
            errors.email
              ? "border-red-500"
              : form.email
              ? "border-green-500"
              : "border-gray-300"
          }`}
        />

        {errors.email && (
          <p className="mb-4 text-sm text-red-500">
            {errors.email}
          </p>
        )}

        <div className="mb-1 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 pr-16 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-500">
            {errors.password}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;