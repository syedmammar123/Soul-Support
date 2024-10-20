import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import useLogout from "../hooks/useLogout";

const Test = () => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authUser = useAuthStore((state) => state.authUser);
  axios.defaults.withCredentials = true;

  const { loading, logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const commonLiClass =
    "bg-green-200 rounded-full w-20 py-1 text-center font-semibold transition-transform duration-300 hover:scale-[1.1] origin-bottom";
  const commonButtonClass =
    "bg-green-500 rounded-full text-center text-lg font-semibold font-mono text-white transition-transform duration-300 hover:scale-[1.1] origin-bottom";

  const renderTherapyAndSignUpButtons = () => {
    if (showMediaIcons) {
      return (
        <>
          <li>
            <button
              className={`${commonButtonClass} w-40`}
              onClick={() => navigate("/therapy")}
            >
              Therapy
            </button>
          </li>
          <li>
            {authUser ? (
              <button
                className={`${commonButtonClass} w-40`}
                onClick={handleLogout}
                disabled={loading}
              >
                Logout
              </button>
            ) : (
              <button
                className={`${commonButtonClass} w-40`}
                onClick={handleLogin}
              >
                Log In
              </button>
            )}
          </li>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <nav className="main-nav z-10 min-w-screen">
        <header className="logo">
          <img
            src="/images/NavLogo.png"
            className="w-36 cursor-pointer"
            alt=""
            onClick={() => navigate("/")}
          />
        </header>

        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }
        >
          <ul>
            {["Home", "AI-Chat", "Quiz", "Blogs", "Careers", "Sessions"].map(
              (item, index) => (
                <li
                  key={index}
                  className={`${commonLiClass} ${
                    pathname.includes(item.toLowerCase())
                      ? "text-white bg-green-600"
                      : ""
                  } ${
                    pathname === "/" && item === "Home"
                      ? "text-white bg-green-600"
                      : ""
                  }`}
                >
                  {item === "Home" ? (
                    <Link to={`/`}>{item}</Link>
                  ) : (
                    <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                  )}
                </li>
              )
            )}
            {renderTherapyAndSignUpButtons()}
          </ul>
        </div>

        <div className="nav-CTA">
          <button
            className={`${commonButtonClass} w-24 hideNavBtns mr-2 `}
            onClick={() => navigate("/therapy")}
          >
            Therapy
          </button>
          {authUser ? (
            <button
              className={`${commonButtonClass} w-24 hideNavBtns`}
              onClick={handleLogout}
              disabled={loading}
            >
              Logout
            </button>
          ) : (
            <button
              className={`${commonButtonClass} w-24 hideNavBtns`}
              onClick={handleLogin}
            >
              Log In
            </button>
          )}

          <div className="hamburger-menu">
            <Link href="#" onClick={() => setShowMediaIcons(!showMediaIcons)}>
              <FontAwesomeIcon icon={faBars} />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Test;
