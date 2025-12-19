import { auth } from "@/configs/firebase";
import { QUERY_KEY } from "@/constants/query-key";
import { login } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

type LoginResponse = {
  token: string;
  user: {
    uid: string;
    email: string;
    displayName: string;
  };
};

const useLoginGoogle = () => {
  const provider = new GoogleAuthProvider();
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation<LoginResponse, Error, string>({
    mutationKey: ["login-google"],
    mutationFn: async (idToken: string) => {
      return await login({ idToken });
    },
  });

  const loginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      mutate(idToken);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.AUTH] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] });
      localStorage.setItem("accessToken", idToken);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return {
    loginGoogle,
    ...rest,
  };
};

export default useLoginGoogle;
