let hasWarned = false;
const databaseConnectionCodes = new Set(["P1000", "P1001", "P1002", "P1003", "P1017"]);

export function isDatabaseUnavailable(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;
  const prismaError = error as { name?: unknown; code?: unknown; errorCode?: unknown };
  if (prismaError.name === "PrismaClientInitializationError") return true;
  return [prismaError.code, prismaError.errorCode].some(
    code => typeof code === "string" && databaseConnectionCodes.has(code),
  );
}

/** Use only for public reads. Never wrap mutations: writes must fail explicitly if persistence is down. */
export async function withPublicDatabaseFallback<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (!isDatabaseUnavailable(error)) throw error;
    if (!hasWarned) {
      console.warn("Public CMS database unavailable; serving local fallback content. Check server-side database configuration.");
      hasWarned = true;
    }
    return fallback;
  }
}
