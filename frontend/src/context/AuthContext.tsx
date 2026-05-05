import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  type AuthUser,
} from "../services/authApi";

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "token";
const USER_KEY = "user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    const currentToken = localStorage.getItem(TOKEN_KEY);
    if (!currentToken) {
      setUser(null);
      setToken(null);
      return;
    }

    const currentUser = await getCurrentUser(currentToken);
    setToken(currentToken);
    setUser(currentUser);
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const savedToken = localStorage.getItem(TOKEN_KEY);
        const savedUser = localStorage.getItem(USER_KEY);

        if (!savedToken) {
          setLoading(false);
          return;
        }

        setToken(savedToken);

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        const currentUser = await getCurrentUser(savedToken);
        setUser(currentUser);
        localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
      } catch {
        clearSession();
      } finally {
        setLoading(false);
      }
    };

    void init();
  }, [clearSession]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginUser(email, password);

    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        id: res.id,
        nombre: res.nombre,
        email: res.email,
      })
    );

    setToken(res.token);
    setUser({
      id: res.id,
      nombre: res.nombre,
      email: res.email,
    });
  }, []);

  const register = useCallback(
    async (nombre: string, email: string, password: string) => {
      await registerUser(nombre, email, password);
      await login(email, password);
    },
    [login]
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, token, loading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}