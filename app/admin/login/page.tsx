"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });

    setLoading(false);

    if (res?.error) {
      setError("Wrong email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-line bg-ink-800 p-8"
      >
        <p className="mb-6 font-mono text-sm text-amber">$ login --admin</p>
        <label className="mb-1 block font-mono text-xs text-paper/50">email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded border border-line bg-ink px-3 py-2 text-paper outline-none focus:border-amber"
        />
        <label className="mb-1 block font-mono text-xs text-paper/50">password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full rounded border border-line bg-ink px-3 py-2 text-paper outline-none focus:border-amber"
        />
        {error && <p className="mb-4 font-mono text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-amber px-4 py-2 font-mono text-sm font-medium text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "signing in…" : "sign in"}
        </button>
      </form>
    </div>
  );
}
