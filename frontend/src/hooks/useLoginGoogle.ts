import { auth } from "@/configs/firebase";
import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
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

  const { mutate, isPending, isSuccess, isError, error } = useMutation<
    LoginResponse,
    Error,
    string
  >({
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
      localStorage.setItem("accessToken", idToken);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  return {
    loginGoogle,
    isPending,
    isSuccess,
    isError,
    error,
  };
};

export default useLoginGoogle;
