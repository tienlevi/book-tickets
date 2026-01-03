import UserTickets from "@/components/Tickets/UserTickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import useLogout from "@/hooks/useLogout";
import useSession from "@/hooks/useSession";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, isLoading } = useSession();

  const navigate = useNavigate();
  const { logout } = useLogout();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading]);

  if (isLoading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <img
                  src={user?.picture}
                  alt="user avatar"
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <button
                  onClick={() => logout()}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Logout
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        <UserTickets />
      </div>
    </div>
  );
}

export default Profile;
