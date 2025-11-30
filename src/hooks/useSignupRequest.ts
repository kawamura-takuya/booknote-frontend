import { useState } from "react";
import { SIGNUP_URL } from "../api/endpoints";
import type { SignupFormValues } from "../types/auth";

export const useSignupRequest = () => {
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const signUp = async (
    values: SignupFormValues,
    reset?: () => void
  ): Promise<void> => {
    setServerErrors([]);
    setSuccess(false);

    try {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            name: values.name,
            email: values.email,
            password: values.password,
            password_confirmation: values.passwordConfirmation,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setServerErrors([]);
        reset?.();
      } else {
        setServerErrors(data.errors || ["予期せぬエラーが発生しました"]);
      }
    } catch (error: unknown) {
      setServerErrors(["ネットワークエラーが発生しました"]);
    }
  };

  return { signUp, serverErrors, success };
};
