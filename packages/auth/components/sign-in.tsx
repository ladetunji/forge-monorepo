"use client";

import { signIn } from '../client';
import { useState } from 'react';

export const SignIn = () => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (method === 'email') {
        await signIn.email({
          email,
          password,
        });
      } else {
        await signIn.phoneNumber({
          phoneNumber,
          password,
        });
      }
      // Optionally, redirect or show success
    } catch (err: any) {
      setError(err?.message || "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2 mb-4">
        <button
          type="button"
          className={method === 'email' ? 'font-bold underline' : ''}
          onClick={() => setMethod('email')}
          aria-pressed={method === 'email'}
        >
          Email
        </button>
        <button
          type="button"
          className={method === 'phone' ? 'font-bold underline' : ''}
          onClick={() => setMethod('phone')}
          aria-pressed={method === 'phone'}
        >
          Phone
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {method === 'email' ? (
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
        ) : (
          <label>
            Phone Number
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              autoComplete="tel"
              required
            />
          </label>
        )}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      </form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-400">or continue with</span>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <button type="button" onClick={() => signIn.social({ provider: "github" })}>Github</button>
        <button type="button" onClick={() => signIn.social({ provider: "google" })}>Google</button>
      </div>
    </>
  );
}