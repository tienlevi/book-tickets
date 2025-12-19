import { QUERY_KEY } from "@/constants/query-key";
import { ITicket } from "@/interfaces/ticket";
import { bookTicket } from "@/services/tickets";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useSession from "./useSession";

function useBookTicket() {
  const queryClient = useQueryClient();
  const { user } = useSession();

  return useMutation({
    mutationKey: ["create-ticket"],
    mutationFn: async (data: ITicket) => {
      if (!user) {
        toast.warn("Please login to book ticket");
        return;
      }

      return await bookTicket({ uid: user?.uid || "", ...data });
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TICKETS] });
        toast.success(data.message || "Ticket booked successfully");
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Failed to book ticket";
      toast.error(message);
    },
  });
}

export default useBookTicket;
