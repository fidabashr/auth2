import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="flex items-center justify-between bg-white px-5 py-4 shadow-sm sm:px-10">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            My Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Your personal account
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-500" />

          <div className="px-6 pb-8 text-center sm:px-10">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.fullName}
                className="-mt-16 mx-auto h-28 w-28 rounded-full border-4 border-white bg-white object-cover shadow-md"
              />
            ) : (
              <div className="-mt-16 mx-auto flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-4xl font-bold text-blue-700 shadow-md">
                {user.fullName?.charAt(0).toUpperCase()}
              </div>
            )}

            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Welcome, {user.fullName}
            </h2>

            <p className="mt-1 text-gray-500">
              @{user.username}
            </p>

            <div className="mt-8 rounded-xl bg-gray-50 p-5 text-left">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Profile Information
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {user.fullName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium text-gray-900">
                    @{user.username}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="break-all font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm text-green-700">
              You are successfully logged in.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;