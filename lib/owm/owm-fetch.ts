type OWMFetchOptions = {
  params: Record<string, string>;
  onError?: (status: number) => never;
  requestInit?: RequestInit;
};

export async function owmFetch<T>(baseUrl: string, options: OWMFetchOptions): Promise<T> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error("API key is not configured");

  // Create a new URL object
  const url = new URL(baseUrl);

  // Add query parameters to the URL
  for (const [key, val] of Object.entries(options.params)) {
    url.searchParams.set(key, val);
  }

  // Add API key to the request
  url.searchParams.set("appid", apiKey);

  // Create request
  const res = await fetch(url.toString(), options.requestInit);
  if (!res.ok) {
    if (options.onError) options.onError(res.status);
    throw new Error(`OWM responded with ${res.status}`);
  }

  return res.json() as Promise<T>;
}
