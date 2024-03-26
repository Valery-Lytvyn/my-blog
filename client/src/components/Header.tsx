import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../routing/routes";
import { DEFAULT_SERVER_URL } from "../constant";
import { CurrentUserContext } from "../contextProvider/UserContextProvider";

const Header: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`${DEFAULT_SERVER_URL}/profile`, {
          credentials: "include",
        });
        if (res.ok) {
          const userInfo = await res.json();
          setCurrentUser(userInfo);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [setCurrentUser]);

  const handleLogout = async () => {
    try {
      await fetch(`${DEFAULT_SERVER_URL}/logout`, {
        credentials: "include",
        method: "POST",
      });
      setCurrentUser({ id: null, username: null });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="header">
      <Link to={ROUTES.index} className="logo">
        My blog
      </Link>

      {currentUser.id ? (
        <div className="user-info">
          <div className="user-logo">{currentUser.username?.[0]}</div>
          <button aria-label="logout" onClick={handleLogout} className="logout">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </button>
        </div>
      ) : (
        <nav className="nav-link">
          <Link to={ROUTES.login}>Login</Link>
          <Link to={ROUTES.register}>Register</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
