import { NavLink } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, {
        withCredentials: true
      });
    alert("Successfully logged out");
    navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Logout failed");
    }
  };
  
  return (
    <header className="bg-blue-100 shadow-md py-4">
      <nav className="max-w-5xl mx-auto px-4">
        <ul className="flex justify-around items-center text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold" : "text-gray-700 hover:text-blue-600"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold" : "text-gray-700 hover:text-blue-600"
              }
            >
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold" : "text-gray-700 hover:text-blue-600"
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/selfanalysis"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold" : "text-gray-700 hover:text-blue-600"
              }
            >
              Self Analysis
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold" : "text-gray-700 hover:text-blue-600"
              }
            >
              Leaderboard
            </NavLink>
          </li>
          <li>
              <button onClick={handleLogout} className= "text-gray-700 hover:text-blue-600">
                Logout
              </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
