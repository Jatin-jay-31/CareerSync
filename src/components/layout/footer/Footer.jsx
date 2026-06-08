import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const isAuthenticated = useSelector(
    (state) => state.auth.status
  );

  return (
    <footer className="w-full border-t bg-white mt-24">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              CareerSync
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              AI-powered job tracking and resume matching
              platform helping job seekers stay organized,
              improve resumes, and land interviews faster.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Product
            </h3>

            <div className="flex flex-col gap-3">

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-700 font-medium"
                        : "text-gray-500 hover:text-teal-900 transition"
                    }
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to="/jobs"
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-700 font-medium"
                        : "text-gray-500 hover:text-teal-900 transition"
                    }
                  >
                    Jobs
                  </NavLink>

                  <NavLink
                    to="/resumes"
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-700 font-medium"
                        : "text-gray-500 hover:text-teal-900 transition"
                    }
                  >
                    Resumes
                  </NavLink>

                  <NavLink
                    to="/ai-analysis"
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-700 font-medium"
                        : "text-gray-500 hover:text-teal-900 transition"
                    }
                  >
                    AI Analysis
                  </NavLink>
                </>
              )}

              {!isAuthenticated && (
                <>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-700 font-medium"
                        : "text-gray-500 hover:text-teal-900 transition"
                    }
                  >
                    Home
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-700 font-medium"
                        : "text-gray-500 hover:text-teal-900 transition"
                    }
                  >
                    Get Started
                  </NavLink>
                </>
              )}

            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Account
            </h3>

            <div className="flex flex-col gap-3">

              {!isAuthenticated ? (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-700 font-medium"
                        : "text-gray-500 hover:text-teal-900 transition"
                    }
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      isActive
                        ? "text-teal-700 font-medium"
                        : "text-gray-500 hover:text-teal-900 transition"
                    }
                  >
                    Signup
                  </NavLink>
                </>
              ) : (
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-teal-700 font-medium"
                      : "text-gray-500 hover:text-teal-900 transition"
                  }
                >
                  Profile
                </NavLink>
              )}

            </div>
          </div>

          {/* Tech & Links */}
          {/* Tech & Developer */}
<div>
  <h3 className="font-semibold text-gray-900 mb-4">
    Built With
  </h3>

  <div className="flex flex-col gap-3 text-gray-500">

    <span>React</span>
    <span>Redux Toolkit</span>
    <span>Firebase</span>
    <span>Gemini AI</span>

    <div className="pt-5">
      <p className="text-sm font-medium text-gray-700 mb-3">
        Built & Maintained by
      </p>

      <p className="text-gray-600 mb-4">
        Jatin Jay Sharma
      </p>

      <div className="flex items-center gap-5">

        <a
          href="https://github.com/Jatin-jay-31"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-black transition duration-200"
        >
          <FontAwesomeIcon
            icon={faGithub}
            size="xl"
          />
        </a>

        <a
          href="https://www.linkedin.com/in/jatin-jay-sharma-18635315b"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition duration-200"
        >
          <FontAwesomeIcon
            icon={faLinkedin}
            size="xl"
          />
        </a>

      </div>
    </div>

  </div>
</div>

        </div>

        {/* Bottom */}
        <div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} CareerSync.
            All rights reserved.
          </p>

          <p className="text-sm text-gray-400">
            Designed & Developed by Jatin Jay Sharma
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;