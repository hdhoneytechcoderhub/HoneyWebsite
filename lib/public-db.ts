let databaseUnavailableWarningLogged = false;

/** Return true only for failures that prevent Prisma from establishing a database connection. */
export function isDatabaseUnavailable(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const candidate = error as { name?: unknown; code?: unknown; errorCode?: unknown };
  if (candidate.name === "PrismaClientInitializationError") return true;

  return [candidate.code, candidate.errorCode].some((code) =>
    typeof code === "string" && ["P1000", "P1001", "P1002", "P1003", "P1017"].includes(code),
  );
}

/**
 * Keep public pages available when the CMS database is offline or has invalid credentials.
 * Query/validation errors are rethrown, and callers must not use this helper for writes.
 */
export async function withPublicDatabaseFallback<T>(
  operation: () => Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;

    if (!databaseUnavailableWarningLogged) {
      console.warn(
        "Public CMS database unavailable; rendering with local fallback content. Check the server-side database configuration.",
      );
      databaseUnavailableWarningLogged = true;
    }

    return fallback;
  }
}
