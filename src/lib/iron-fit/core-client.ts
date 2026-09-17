async function coreFetch(path: string, init: RequestInit = {}, retry = true) {
  const response = await fetch(`/api/iron-fit/core/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });
  if (response.status === 401 && retry) {
    const refreshed = await fetch("/api/iron-fit/auth/refresh", { method: "POST" });
    if (refreshed.ok) return coreFetch(path, init, false);
  }
  const data = await response.json().catch(() => ({})) as unknown;
  if (!response.ok) {
    const error = data && typeof data === "object" && "error" in data ? String((data as { error?: unknown }).error) : "Falha na operação.";
    throw new Error(error);
  }
  return data;
}

export function coreGet<T>(path: string) {
  return coreFetch(path) as Promise<T>;
}

export function corePost<T>(path: string, body: unknown) {
  return coreFetch(path, { method: "POST", body: JSON.stringify(body) }) as Promise<T>;
}

export function corePatch<T>(path: string, body: unknown = {}) {
  return coreFetch(path, { method: "PATCH", body: JSON.stringify(body) }) as Promise<T>;
}
