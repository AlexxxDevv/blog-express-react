// export const baseUrl: string = "http://51.250.34.32:3001";
export const baseUrl: string = "http://localhost:3001";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkResponse = (res: { ok: unknown; json: () => any; status: unknown; }) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export function request(url: string, options?: object) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
}