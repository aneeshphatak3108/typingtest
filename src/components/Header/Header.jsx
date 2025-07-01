import { NavLink } from 'react-router-dom'

function Header() {
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
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                isActive ? "text-blue-700 font-semibold" : "text-gray-700 hover:text-blue-600"
              }
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
