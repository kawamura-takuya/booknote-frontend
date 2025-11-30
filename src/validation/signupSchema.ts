import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, "名前は必須です")
      .max(30, "名前は30文字以内で入力してください")
      .refine((value) => value.trim().length > 0, {
        message: "名前は空白のみでは登録できません",
      }),
    email: z
      .string()
      .min(1, "メールアドレスは必須です")
      .pipe(z.email("メールアドレスの形式が正しくありません")),
    password: z
      .string()
      .min(1, "パスワードは必須です")
      .min(8, "パスワードは8文字以上で入力してください"),
    passwordConfirmation: z
      .string()
      .min(1, "パスワード（確認）は必須です"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "パスワードと確認用パスワードが一致しません",
    path: ["passwordConfirmation"],
  });
