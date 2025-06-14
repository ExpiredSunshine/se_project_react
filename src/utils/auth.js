const baseUrl = "http://localhost:3001";

export const signUp = (data) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Signup failed: ${res.status}`);
  });
};

export const signIn = (credentials) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Signin failed: ${res.status}`);
  });
};

export const getCurrentUser = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(`Fetch user failed: ${res.status}`);
  });
};
