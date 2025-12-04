import type { SignupFormValues } from "../../types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../validation/signupSchema";
import { useSignupRequest } from "../../hooks/useSignupRequest";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Signup.css";

const Signup: React.FC = () => {

  // React-Hook-Form のフックから、入力値の登録・送信処理・エラー状態などを取得
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<SignupFormValues>({ 
    mode: "onChange",
    resolver: zodResolver(signupSchema),
  });

  // カスタムフック useSignupRequest から、新規登録処理とサーバーサイドの状態を取得
  const {
    signUp,
    serverErrors,
    success,
  } = useSignupRequest();

  const onSubmit = async (values: SignupFormValues) => {
    await signUp(values, reset);
  };

  return (
    <div className="site-layout">
      <Header />

      <main className="signup-main">
        <div className="site-container">
          <div className="signup-container">
            <h2 className="signup-heading">新規登録</h2>

            <div className="signup-message-slot">
              {/* 成功メッセージ */}
              {success && (
                <p className="signup-success">
                  仮登録が完了しましたので、確認メールを送信しました。
                  メール内のリンクをクリックして登録を完了して下さい。
                </p>
              )}

              {/* サーバーサイドのエラーメッセージ */}
              {!success && serverErrors.length > 0 && (
                <div className="signup-error-container">
                  {serverErrors.map((error, index) => (
                    <p key={`${index}-${error}`} className="signup-error">
                      {error}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* 新規登録フォーム */}
            <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
              {/* 名前 */}
              <div className="signup-field">
                <label htmlFor="signup-name" className="signup-label">名前</label>
                <input
                  id="signup-name"
                  type="text"
                  className="signup-input"
                  autoComplete="name"
                  {...register("name")}
                />
                <div className="signup-error-slot">
                  {formErrors.name && (
                    <p className="signup-error">{formErrors.name.message}</p>
                  )}
                </div>
              </div>

              {/* メールアドレス */}
              <div className="signup-field">
                <label htmlFor="signup-email" className="signup-label">メールアドレス</label>
                <input
                  id="signup-email"
                  type="email"
                  className="signup-input"
                  autoComplete="email"
                  {...register("email")}
                />
                <div className="signup-error-slot">
                  {formErrors.email && (
                    <p className="signup-error">{formErrors.email.message}</p>
                  )}
                </div>
              </div>

              {/* パスワード */}
              <div className="signup-field">
                <label htmlFor="signup-password" className="signup-label">パスワード</label>
                <input
                  id="signup-password"
                  type="password"
                  className="signup-input"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <div className="signup-error-slot">
                  {formErrors.password && (
                    <p className="signup-error">{formErrors.password.message}</p>
                  )}
                </div>
              </div>

              {/* パスワード（確認） */}
              <div className="signup-field">
                <label htmlFor="signup-password-confirm" className="signup-label">パスワード（確認）</label>
                <input
                  id="signup-password-confirm"
                  type="password"
                  className="signup-input"
                  autoComplete="new-password"
                  {...register("passwordConfirmation")}
                />
                <div className="signup-error-slot">
                  {formErrors.passwordConfirmation && (
                    <p className="signup-error">
                      {formErrors.passwordConfirmation.message}
                    </p>
                  )}
                </div>
              </div>
              
              {/* 登録ボタン */}
              <button
                type="submit"
                className="signup-submit-btn"
                disabled={isSubmitting || success}
              >
                {isSubmitting ? "送信中..." : "登録"}
              </button>
            </form>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Signup;
