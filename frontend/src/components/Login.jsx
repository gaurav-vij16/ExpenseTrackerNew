import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const api_url = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    if (!username || !password) return;

    setLoading(true);

    try {
      const response = await fetch(`${api_url}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/home";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Hi, Welcome Back! 👋</h2>
        
        <label className="block text-gray-700">Username</label>
        <input 
          type="text"
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-gray-700 mt-2">Password</label>
        <input 
          type="password"
          className="w-full p-2 border rounded mt-1"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Remember Me</span>
          </div>
          <a href="#" className="text-red-500">Forgot Password?</a>
        </div>

        <button 
          onClick={handleLogin}
          disabled={loading || !username || !password}
          className={`w-full py-2 rounded mt-4 transition-all duration-300 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
