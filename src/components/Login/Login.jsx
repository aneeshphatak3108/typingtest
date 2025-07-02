import { useState } from "react";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', {
            username: username,
            password:passwd
        }, {
            withCredentials: true
        })
        .then(response => {
            alert(`Successfully logged in as ${username}`);
        })
        .catch(error => {
            alert(error.response?.data?.message || error.message);
        })
    }

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