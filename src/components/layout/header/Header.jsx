import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo } from "../../index";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      path: "/",
      active: !authStatus,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      active: authStatus,
    },
    {
      name: "Jobs",
      path: "/jobs",
      active: authStatus,
    },
    {
      name: "Resumes",
      path: "/resumes",
      active: authStatus,
    },
    {
      name: "AI Analysis",
      path: "/ai-analysis",
      active: authStatus,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto">

        <nav className="h-20 flex items-center">

          {/* Left Section */}
          <div className="shrink-0 flex">
            <Link
              to="/"
              className="flex items-center gap-2"
            >
              <Logo />

              <span className="text-2xl font-bold text-gray-900">
                CareerSync
              </span>
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="flex-1 flex justify-center">

            <div className="hidden md:flex items-center gap-8">

              {navItems.map(
                (item) =>
                  item.active && (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? "text-emerald-600 font-semibold"
                          : "text-gray-600 hover:text-emerald-600 transition"
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
              )}

            </div>

          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4 shrink-0">

            {!authStatus ? (
              <>
                <NavLink
                  to="/login"
                  className="text-gray-600 hover:text-emerald-600 transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-medium transition"
                >
                  Get Started
                </NavLink>
              </>
            ) : (
              <div className="flex items-center gap-4">

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-emerald-600 font-semibold"
                      : "text-gray-600 hover:text-emerald-600 transition"
                  }
                >
                  Profile
                </NavLink>

                <LogoutBtn />
              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto text-2xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </nav>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">

          <div className="px-6 py-4 flex flex-col gap-4">

            {navItems.map(
              (item) =>
                item.active && (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-emerald-600 font-semibold"
                        : "text-gray-600"
                    }
                  >
                    {item.name}
                  </NavLink>
                )
            )}

            {!authStatus ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-center"
                >
                  Get Started
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-600"
                >
                  Profile
                </NavLink>

                <LogoutBtn />
              </>
            )}

          </div>

        </div>
      )}

    </header>
  );
}

export default Header;