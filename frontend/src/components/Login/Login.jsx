import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BACKEND_URL;



function Login() {
    const [username, setUsername] = useState("");
    const location = useLocation();
    const scoreToSave = location.state?.score || null;
    const [passwd, setPasswd] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(`${apiUrl}api/login`, {
          "username": username, 
          "password": passwd
        }, { withCredentials: true });
    
        if (scoreToSave) {
          try {
            await axios.post(`${apiUrl}api/savescore`, scoreToSave, {
              withCredentials: true
            });
            alert("Score saved successfully after login!");
          } catch (err) {
            alert("Logged in, but score couldn't be saved.");
          }
        }
        // Redirect after login
        navigate('/');
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    };
    

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800"> Log in</h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Username</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                  onChange={(e) => setPasswd(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      );
      
}

export default Login;