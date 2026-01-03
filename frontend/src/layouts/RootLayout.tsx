import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui";
import useLoginGoogle from "@/hooks/useLoginGoogle";
import useSession from "@/hooks/useSession";
import useLogout from "@/hooks/useLogout";
import { useState } from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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

            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors font-medium"
                aria-label="Home"
              >
                Home
              </Link>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-lg shadow-purple-500/25"
                      aria-label="Open user menu"
                    >
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-slate-900 border-white/10"
                  >
                    <DropdownMenuLabel className="text-gray-400">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <Link to={`/profile`}>
                      <DropdownMenuItem className="cursor-pointer focus:bg-white/10">
                        Profile{" "}
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem
                      disabled={isPending}
                      onClick={() => logout()}
                      className="text-red-400 focus:text-red-300 cursor-pointer focus:bg-red-950/30"
                    >
                      {isPending ? "Logging out..." : "Logout"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

      <main className="max-w-7xl mx-auto">{children}</main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-slate-900 border-white/10 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">
              Welcome Back
            </DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <Button
              onClick={handleGoogleLogin}
              variant="secondary"
              className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium py-6"
              aria-label="Sign in with Google"
            >
              Continue with Google
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RootLayout;
