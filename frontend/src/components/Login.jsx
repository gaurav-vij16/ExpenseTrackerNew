import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/home";
    } else {
      alert("Login failed");
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
          className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
