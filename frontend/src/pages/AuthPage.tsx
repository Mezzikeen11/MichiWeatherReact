import AuthCard from "../components/auth/AuthCard";

export default function AuthPage() {
  return (
    <section className="container-michi min-h-[calc(100vh-180px)] flex items-center justify-center py-10">
      <main className="relative w-full flex justify-center">
        <AuthCard />
      </main>
    </section>
  );
}