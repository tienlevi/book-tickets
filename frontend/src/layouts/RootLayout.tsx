import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Modal from "@/components/Modal";
import useLoginGoogle from "@/hooks/useLoginGoogle";
import useSession from "@/hooks/useSession";
import useLogout from "@/hooks/useLogout";

const RootLayout = () => {
  const { user } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginGoogle } = useLoginGoogle();
  const { logout, isPending } = useLogout();

  const handleGoogleLogin = async () => {
    await loginGoogle();
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-white font-bold text-xl hover:text-purple-300 transition-colors"
              aria-label="Go to home page"
            >
              <span className="text-2xl">🎫</span>
              <span>Book Tickets</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                aria-label="Home"
              >
                Home
              </Link>
              {user ? (
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/25 cursor-pointer"
                >
                  {user.name}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/25 cursor-pointer"
                  aria-label="Open login modal"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Welcome Back"
      >
        {user ? (
          <button
            disabled={isPending}
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors cursor-pointer"
            aria-label="Sign in with Google"
          >
            Continue with Google
          </button>
        )}
      </Modal>
    </div>
  );
};

export default RootLayout;
