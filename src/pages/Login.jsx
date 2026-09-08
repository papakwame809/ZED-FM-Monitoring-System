import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/apiClient"; // Adjust path if needed

import logo from "../assets/newzedlogo.jpg";
function Login() {
  const navigate = useNavigate();

  // State to toggle between Login and Register modes
  const [isRegistering, setIsRegistering] = useState(false);

  // Form field states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    // Front-end confirmation check for registration
    if (isRegistering && password !== passwordConfirmation) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const endpoint = isRegistering ? "/register" : "/login";
    const payload = isRegistering
      ? {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }
      : { email, password };

    try {
      const data = await apiFetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (isRegistering) {
        // Registration success
        setIsRegistering(false);
        setPassword("");
        setPasswordConfirmation("");
        setSuccessMsg("Account created successfully! Please sign in.");
      } else {
        // Login success: Store token & active user
        if (data.token) {
          localStorage.setItem("auth_token", data.token);
        }
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Notify other components (like Topbar) to re-sync state immediately
        window.dispatchEvent(new Event("storage"));

        // Navigate to main application
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setSuccessMsg("");
    setPassword("");
    setPasswordConfirmation("");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-fuchsia-800">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col items-center gap-6 px-8 py-10"
      >
        <img
          src={logo}
          alt="ZED FM"
          className="h-32 w-80 object-contain"
        />

        <div className="flex w-full flex-col items-center">
          <h1 className="text-2xl font-semibold text-white">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h1>

          <p className="mt-1 text-center text-sm text-white">
            {isRegistering
              ? "Sign up to access the technical monitoring system"
              : "Sign in to access the technical monitoring system"}
          </p>
        </div>

        {/* Backend / Frontend Error Alert */}
        {error && (
          <div className="w-full rounded-xl bg-red-100 px-4 py-3 text-center text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="w-full rounded-xl bg-emerald-100 px-4 py-3 text-center text-sm font-medium text-emerald-800">
            {successMsg}
          </div>
        )}

        {/* Name Field (Register mode only) */}
        {isRegistering && (
          <div className="w-full">
            <label className="mb-2 block text-center text-sm font-bold text-white">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-sm outline-none"
            />
          </div>
        )}

        {/* Email Address Field */}
        <div className="w-full">
          <label className="mb-2 block text-center text-sm font-bold text-white">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Password Field */}
        <div className="w-full">
          <label className="mb-2 block text-center text-sm font-bold text-white">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 pr-12 text-sm outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field (Register mode only) */}
        {isRegistering && (
          <div className="w-full">
            <label className="mb-2 block text-center text-sm font-bold text-white">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirm password"
                required
                className="w-full rounded-xl border border-gray-400 bg-white px-4 py-3 pr-12 text-sm outline-none"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-8 py-3 font-bold text-white transition hover:bg-violet-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? isRegistering
              ? "Creating account..."
              : "Logging in..."
            : isRegistering
            ? "Create Account"
            : "Login"}
        </button>

        {/* Mode Toggle Switch */}
        <p className="text-sm text-white">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={handleToggleMode}
            className="font-bold underline hover:text-gray-200"
          >
            {isRegistering ? "Sign In" : "Create Account"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;