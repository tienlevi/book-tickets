import { Outlet, Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components/ui";
import useLoginGoogle from "@/hooks/useLoginGoogle";
import useSession from "@/hooks/useSession";
import useLogout from "@/hooks/useLogout";
import { useState } from "react";

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
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg shadow-purple-500/25"
                  aria-label="Open user menu"
                >
                  {user.name}
                </Button>
              ) : (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg shadow-purple-500/25"
                  aria-label="Open login modal"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              Welcome Back
            </DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            {user ? (
              <Button
                disabled={isPending}
                onClick={() => logout()}
                variant="secondary"
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-6"
                aria-label="Logout"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={handleGoogleLogin}
                variant="secondary"
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-6"
                aria-label="Sign in with Google"
              >
                Continue with Google
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RootLayout;
