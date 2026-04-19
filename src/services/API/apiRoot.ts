import rootUrl from "./rootUrl";

export const methods = {
  DELETE: "DELETE",
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
} as const;

export type HttpMethod = (typeof methods)[keyof typeof methods];
export type RequestBody = FormData | Record<string, unknown> | unknown[] | string | number | boolean | null;

function buildRequestInit(method: HttpMethod, body?: RequestBody): RequestInit {
  const isBodyAllowed = method !== methods.GET && method !== methods.DELETE;

  if (!isBodyAllowed || body == null) {
    return { method };
  }

  if (body instanceof FormData) {
    return {
      method,
      body,
    };
  }

  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
}

async function request<T>(url: string, method: HttpMethod, body?: RequestBody): Promise<T> {
  const response = await fetch(url, buildRequestInit(method, body));
  const data = await parseResponse<T>(response);

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function apiRequest<T = unknown>(url: string, method: HttpMethod, body?: RequestBody): Promise<T> {
  return request<T>(rootUrl + url, method, body);
}

export async function externalApiRequest<T = unknown>(url: string, method: HttpMethod, body?: RequestBody): Promise<T> {
  return request<T>(url, method, body);
}
