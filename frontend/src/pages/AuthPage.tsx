import AuthCard from "../components/auth/AuthCard";

export default function AuthPage() {
  return (
    <main className="min-h-[calc(100vh-160px)] py-10">
      <section className="container-michi flex min-h-[calc(100vh-190px)] items-center justify-center">
        <AuthCard />
      </section>
    </main>
  );
}