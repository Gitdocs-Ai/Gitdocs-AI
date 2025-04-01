import { LoginForm } from "@/components/loginForm/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Login | Gitdocs AI",
  description: "Login to your Gitdocs AI account",
};
