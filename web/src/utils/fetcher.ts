export const fetcher = async <T>(url: string, data?: any): Promise<T> => {
  const _obj = data
    ? {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    : undefined;

  const res = await fetch(url, _obj);
  const json = await res.json();

  return json;
};
