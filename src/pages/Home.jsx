import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);

  if (authStatus) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium">
              AI Job Tracker & Resume Matcher
            </span>

            <h1 className="mt-6 text-5xl font-bold text-gray-900 leading-tight">
              Track Jobs.
              <br />
              Match Resumes.
              <br />
              Land Interviews Faster.
            </h1>

            <p className="mt-6 text-lg text-gray-600">
              CareerSync helps you organize job applications,
              manage resumes, and get AI-powered resume insights
              to improve your chances of getting hired.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                to="/signup"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="border border-gray-300 hover:border-gray-400 px-6 py-3 rounded-lg font-medium transition"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Right Side Dashboard Preview */}
          <div className="bg-white rounded-2xl shadow-lg border p-6">

            <div className="flex justify-between items-center border-b pb-4">
              <h3 className="font-semibold text-lg">
                CareerSync Dashboard
              </h3>

              <span className="text-sm text-emerald-600 font-medium">
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-emerald-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">
                  Applications
                </p>

                <h4 className="text-2xl font-bold">
                  18
                </h4>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm">
                  Interviews
                </p>

                <h4 className="text-2xl font-bold">
                  4
                </h4>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">
                Resume Match Score
              </p>

              <h4 className="text-3xl font-bold text-emerald-600">
                84%
              </h4>

              <p className="text-sm text-gray-600 mt-2">
                Missing Skills:
              </p>

              <ul className="mt-2 text-sm text-gray-700">
                <li>• Docker</li>
                <li>• AWS</li>
                <li>• CI/CD</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-4 gap-6 mt-12">

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold">
              📌 Track Jobs
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Manage applications, interviews and offers.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold">
              📄 Manage Resumes
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Store and organize multiple resumes.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold">
              🤖 AI Match Score
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Compare resumes against job descriptions.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-semibold">
              ✨ Resume Tailoring
            </h3>

            <p className="text-gray-600 mt-2 text-sm">
              Get AI suggestions to improve resumes.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-3xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold">
            Ready to organize your job search?
          </h2>

          <p className="mt-4 text-gray-600">
            Create your account and start tracking
            applications today.
          </p>

          <Link
            to="/signup"
            className="inline-block mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-medium transition"
          >
            Create Free Account
          </Link>

        </div>
      </section>

    </div>
  );
}

export default Home;

