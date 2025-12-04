import { QUERY_KEY } from "@/constants/query-key";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logout, ...rest } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      localStorage.removeItem("accessToken");
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEY.AUTH, null], null);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH] });
    },
  });

  return { logout, ...rest };
};

export default useLogout;
