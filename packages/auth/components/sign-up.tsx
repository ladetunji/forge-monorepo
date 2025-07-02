"use client";

import { signUp } from '../client';
import { signIn } from '../client';
import { useState } from 'react';

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError(null);
          setLoading(true);
          try {
            await signUp.email({ email, password, name });
            // Optionally redirect or show success
          } catch (err) {
            if (err instanceof Error) {
              setError(err.message);
            } else {
              setError("Sign up failed. Please try again.");
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className='w-full border-gray-200 border-t' />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className='bg-white px-2 text-gray-400'>or continue with</span>
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button type="button" onClick={() => signIn.social({ provider: "github" })}>Github</button>
        <button type="button" onClick={() => signIn.social({ provider: "google" })}>Google</button>
      </div>
    </>
  );
}