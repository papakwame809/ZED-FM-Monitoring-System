// src/api/apiClient.js
export async function apiFetch(endpoint, options = {}) {
  // Check common key names for token
  const token = 
    localStorage.getItem("token") || 
    localStorage.getItem("auth_token") || 
    localStorage.getItem("token_id");

  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`http://127.0.0.1:8000/api${endpoint}`, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized (expired or invalid token)
  if (response.status === 401) {
    console.error("401 Unauthorized from endpoint:", endpoint);
    localStorage.removeItem("token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token_id");
    
    // Prevent redirect loop if already on the login page
    if (!window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }
    
    throw new Error("Unauthenticated");
  }

  // Handle other error statuses
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    // Laravel validation errors (422) often send messages inside 'errors' or a top-level 'message'
    const errorMessage = errorData.message || 
      (errorData.errors ? Object.values(errorData.errors)[0][0] : null) || 
      `Request failed with status ${response.status}`;
    
    throw new Error(errorMessage);
  }

  // Handle empty responses (like 204 No Content)
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return null;
  }

  return response.json();
}