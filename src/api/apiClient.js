
// src/api/apiClient.js

const API_BASE_URL =
  "https://zed-fm-monitoring-system.onrender.com/api";

export async function apiFetch(
  endpoint,
  options = {}
) {
  // Get the authentication token
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("auth_token") ||
    localStorage.getItem("token_id");

  // Build request headers
  const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token
      ? { Authorization: `Bearer ${token}` }
      : {}),
    ...options.headers,
  };

  // Send request to the deployed Laravel API
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  // Handle unauthenticated requests
  if (response.status === 401) {
    console.error(
      "401 Unauthorized from endpoint:",
      endpoint
    );

    localStorage.removeItem("token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("token_id");

    // Prevent redirect loop on login page
    if (
      !window.location.pathname.includes("/login")
    ) {
      window.location.href = "/login";
    }

    throw new Error("Unauthenticated");
  }

  // Handle other failed requests
  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({}));

    const errorMessage =
      errorData.message ||
      (errorData.errors
        ? Object.values(errorData.errors)[0][0]
        : null) ||
      `Request failed with status ${response.status}`;

    throw new Error(errorMessage);
  }

  // Handle empty responses
  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null;
  }

  // Return JSON response
  return response.json();
}

