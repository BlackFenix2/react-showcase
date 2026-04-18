import rootUrl from "../API/rootUrl";

export const methods = {
  DELETE: "DELETE",
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
};

function buildRequestInit(method, body?) {
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

async function request<T>(url: string, method: string, body?): Promise<T> {
  const response = await fetch(url, buildRequestInit(method, body));
  const data = await parseResponse<T>(response);

  if (!response.ok) {
    throw data;
  }

  return data;
}

export async function apiRequest<T = unknown>(url: string, method: string, body?) {
  return request<T>(rootUrl + url, method, body);
}

export async function externalApiRequest<T>(url: string, method: string, body?) {
  return request<T>(url, method, body);
}
