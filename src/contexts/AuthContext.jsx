import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  registerUser,
  getUserByEmail,
  getUserById,
  checkUsername as checkUsernameApi,
  checkEmail as checkEmailApi
} from "../services/authApi";

const AuthContext = createContext(null);

const safeUser = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async ({ email, password }) => {
    const users = await getUserByEmail(email.trim());

    const foundUser = users.find(
      (item) => item.password === password
    );

    if (!foundUser) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem("userId", foundUser.id);
    setUser(safeUser(foundUser));

    return safeUser(foundUser);
  };

  const register = async (userData) => {
    const existingUsername = await checkUsernameApi(
      userData.username.trim()
    );

    if (existingUsername.length > 0) {
      throw new Error("Username already exists");
    }

    const existingEmail = await checkEmailApi(
      userData.email.trim()
    );

    if (existingEmail.length > 0) {
      throw new Error("Email is already registered");
    }

    const newUser = await registerUser({
      ...userData,
      username: userData.username.trim(),
      email: userData.email.trim(),
      fullName: userData.fullName.trim(),
      createdAt: new Date().toISOString()
    });

    localStorage.setItem("userId", newUser.id);
    setUser(safeUser(newUser));

    return safeUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  const isAuthenticated = () => user !== null;

  const fetchCurrentUser = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const currentUser = await getUserById(userId);
      setUser(safeUser(currentUser));
    } catch {
      localStorage.removeItem("userId");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const checkUsername = async (username) => {
    const users = await checkUsernameApi(username.trim());
    return users.length > 0;
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
        fetchCurrentUser,
        checkUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);