import { RegisterForm } from "@/components/loginForm/RegisterForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}

export const metadata = {
  title: "Register | Gitdocs AI",
  description: "Create an account to get started",
};
