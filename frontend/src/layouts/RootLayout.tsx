import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Modal from "@/components/Modal";
import useLoginGoogle from "@/hooks/useLoginGoogle";
import GoogleIcon from "@/components/icons/GoogleIcon";

const RootLayout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { loginGoogle, isPending } = useLoginGoogle();

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleGoogleLogin = async () => {
    await loginGoogle();
    handleCloseLoginModal();
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
              <button
                type="button"
                onClick={handleOpenLoginModal}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/25"
                aria-label="Open login modal"
              >
                Login
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        title="Welcome Back"
      >
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isPending}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-medium py-3 px-4 rounded-xl transition-colors"
          aria-label="Sign in with Google"
        >
          {isPending ? (
            <Loader2
              className="h-5 w-5 animate-spin text-gray-600"
              aria-hidden="true"
            />
          ) : (
            <GoogleIcon className="w-5 h-5" />
          )}
          {isPending ? "Signing in..." : "Continue with Google"}
        </button>
      </Modal>
    </div>
  );
};

export default RootLayout;
