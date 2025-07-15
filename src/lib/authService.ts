import { staticUsers, StaticUser } from "./staticUsers";

const USER_KEY = "auth_user";

export const AuthService = {
  login: (email: string, password: string): StaticUser | null => {
    const user = staticUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },
  logout: () => {
    localStorage.removeItem(USER_KEY);
  },
  getCurrentUser: (): StaticUser | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(USER_KEY);
  }
}; 