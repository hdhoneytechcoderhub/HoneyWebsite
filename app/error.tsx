"use client";

import Link from "next/link";
import { useEffect } from "react";

function databaseHint(message: string) {
  if (message.includes("DATABASE_URL") || message.includes("PrismaClientInitializationError")) {
    return "The database connection is not configured. Set DATABASE_URL in .env (server-side only) and restart the development server.";
  }
  if (message.includes("authentication failed") || message.includes("P1000") || message.includes("P1001")) {
    return "The server could not authenticate with the database. Check the credentials in DATABASE_URL.";
  }
  if (message.includes("does not exist") || message.includes("P1003")) {
    return "The database named in DATABASE_URL does not exist. Create it, then run the migrations.";
  }
  return "The content could not be loaded right now. Please try again in a moment.";
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDatabaseError = /Prisma|DATABASE_URL|P1\d{3}/.test(error.message);

  return (
    <main className="admin-login">
      <section className="admin-login-card">
        <p className="eyebrow">Honey Media House</p>
        <h1>{isDatabaseError ? "Content is temporarily unavailable." : "Something went wrong."}</h1>
        <p>{databaseHint(error.message)}</p>
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
