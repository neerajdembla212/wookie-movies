const BASE_URL = "https://wookie.codesubmit.io/";

const API_KEY = import.meta.env.VITE_WOOKIE_API_KEY;

if (!API_KEY) {
  throw new Error("Missing VITE_WOOKIE_API_KEY in environment variables");
}
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

interface RequestOptions<TBody = unknown>
  extends Omit<RequestInit, "body" | "method"> {
  method?: HttpMethod;
  body?: TBody;
  queryParmas?: Record<string, string | number>;
}

// base request function which controls the underlying http technology to use for network calls
async function request<TBody = unknown, TResponse = any>(
  endpoint: string,
  options: RequestOptions<TBody>
): Promise<TResponse> {
  const { method = "GET", headers, body, queryParmas } = options;
  const requestConfig: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
      ...headers,
    },
  };

  let url = `${BASE_URL}${endpoint}`;

  if (queryParmas && Object.entries(queryParmas).length > 0) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParmas)) {
      searchParams.set(key, String(value));
    }
    url += `?${searchParams.toString()}`;
  }

  if (body) {
    requestConfig.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestConfig);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Api error: ${response.status} ${errorText}`);
  }

  return response.json();
}

// we can expand this api to scale to use post, put, delete functions in future
export const http = {
  get: <TResponse = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<undefined, TResponse>(endpoint, { method: "GET", ...options }),
};
