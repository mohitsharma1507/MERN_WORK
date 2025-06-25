import { jwtDecode } from "jwt-decode";

export const register = (token) => {
  localStorage.setItem("token", token);
};
export const login = (token) => {
  localStorage.setItem("token", token);
};

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
}
