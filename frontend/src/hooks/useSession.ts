import { QUERY_KEY } from "@/constants/query-key";
import IAuth from "@/interfaces/auth";
import { getAuth } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

function useSession() {
  const token = localStorage.getItem("accessToken");
  const { data: user, ...rest } = useQuery<IAuth>({
    queryKey: [QUERY_KEY.AUTH, token],
    queryFn: async () => {
      return await getAuth();
    },
    enabled: !!token,
  });

  return { user, ...rest };
}

export default useSession;
