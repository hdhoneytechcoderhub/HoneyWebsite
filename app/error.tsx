"use client";

import Link from "next/link";
import { useEffect } from "react";


export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="admin-login">
      <section className="admin-login-card">
        <p className="eyebrow">Honey Media House</p>
        <h1>Something went wrong.</h1>
        <p>The page could not be loaded right now. Please try again in a moment.</p>
        <div className="hero-actions">
          <button className="button" type="button" onClick={() => reset()}>
            Try again
          </button>
          <Link className="button button-outline" href="/contact">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
