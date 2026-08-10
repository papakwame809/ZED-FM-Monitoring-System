const API_BASE_URL = "http://127.0.0.1:8000/api";

export function getAuthToken() {
return localStorage.getItem("auth_token");
}

export function authHeaders(extraHeaders = {}) {
const token = getAuthToken();

return {
Accept: "application/json",


...(token
  ? {
      Authorization: `Bearer ${token}`,
    }
  : {}),

...extraHeaders,


};
}

export async function apiFetch(
endpoint,
options = {}
) {
const response = await fetch(
`${API_BASE_URL}${endpoint}`,
{
...options,


  headers: authHeaders(
    options.headers || {}
  ),
}

);

const text =
await response.text();

const data = text
? JSON.parse(text)
: {};

if (!response.ok) {
console.error(
"API Error:",
data
);


throw new Error(
  data.message ||
  "Request failed"
);


}

return data;
}
