import AuthCard from "../components/auth/AuthCard";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
      <main className="relative w-full px-4 flex justify-center">
        <AuthCard />
      </main>
    </div>
  );
}
