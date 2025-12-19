import { QUERY_KEY } from "@/constants/query-key";
import { cancelTicket } from "@/services/tickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSession from "./useSession";
import { toast } from "react-toastify";

function useCancelTicket() {
  const queryClient = useQueryClient();
  const { user } = useSession();

  return useMutation({
    mutationKey: ["cancel-ticket"],
    mutationFn: async (matchId: number) => {
      return await cancelTicket(user?.uid || "", matchId);
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TICKETS] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });

        toast.success(data.message || "Ticket cancel successfully");
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Failed to cancel ticket";
      toast.error(message);
    },
  });
}

export default useCancelTicket;
