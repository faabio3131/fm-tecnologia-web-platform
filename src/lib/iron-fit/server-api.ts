type UpstreamResult<T> = {
  status: number;
  data: T | null;
};

function apiBaseUrl() {
  const raw = process.env.IRON_FIT_API_URL?.trim();
  if (!raw) throw new Error("IRON_FIT_API_URL is not configured");
  const url = new URL(raw);
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error("IRON_FIT_API_URL must use http(s)");
  return url.href.replace(/\/$/, "");
}

export async function ironFitUpstream<T>(
  path: string,
  init: RequestInit = {},
): Promise<UpstreamResult<T>> {
  const response = await fetch(`${apiBaseUrl()}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...init.headers,
    },
  });

  let data: T | null = null;
  try {
    data = (await response.json()) as T;
  } catch {
    data = null;
  }
  return { status: response.status, data };
}

export function bearer(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` };
}

export function safeUpstreamStatus(status: number) {
  if (status === 400 || status === 401 || status === 403 || status === 404 || status === 409 || status === 422 || status === 429) {
    return status;
  }
  return 503;
}

export function publicError(status: number) {
  if (status === 401) return "Credenciais inválidas ou sessão expirada.";
  if (status === 403) return "Acesso não autorizado.";
  if (status === 429) return "Muitas tentativas. Tente novamente mais tarde.";
  if (status >= 500) return "Serviço temporariamente indisponível.";
  return "Não foi possível concluir a solicitação.";
}
