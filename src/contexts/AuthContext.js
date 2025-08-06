import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useHistory } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import authApi, { setAuthToken } from "../services/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole] = useState(() =>
    localStorage.getItem("userRole")
  );
  const [userID, setUserID] = useState(() => {
    const storedUserID = localStorage.getItem("userID");
    return storedUserID ? parseInt(storedUserID, 10) : null;
  });
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const isRefreshing = useRef(false);
  const refreshPromise = useRef(null);

  const decodeToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);
      const role =
        decoded.roles && decoded.roles.length > 0 ? decoded.roles[0] : null;
      const id = decoded.user_id ? parseInt(decoded.user_id, 10) : null;
      return { role, id };
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return { role: null, id: null };
    }
  }, []);

  const login = (token) => {
    setAccessToken(token);
    setAuthToken(token);
    const { role, id } = decodeToken(token);
    localStorage.setItem("userRole", role);
    setUserRole(role);
    localStorage.setItem("userID", id);
    setUserID(id);
    return role;
  };

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authApi.post(`/api/user/auth/logout`);
    } catch (error) {
      console.error("Error logging out on the server:", error);
    } finally {
      setAccessToken(null);
      setAuthToken(null);
      localStorage.removeItem("userRole");
      setUserRole(null);
      localStorage.removeItem("userID");
      setUserID(null);
      history.push("/auth/signin");
      setLoading(false);
    }
  }, [history]);

  const verifyAndRefreshTokens = useCallback(async () => {
    if (isRefreshing.current) {
      return refreshPromise.current;
    }

    if (accessToken) {
      try {
        const verifyResponse = await authApi.get(`/api/users/auth/verify`);
        if (verifyResponse.status === 200) {
          return accessToken;
        }
      } catch (error) {
        console.error("Error verifying access token:", error);
      }
    }

    if (!userID) {
      logout();
      return null;
    }

    isRefreshing.current = true;
    refreshPromise.current = (async () => {
      try {
        setLoading(true);
        const refreshResponse = await authApi.post(
          "/api/user/auth/refresh",
          { user_id: userID },
          { headers: { Authorization: undefined } }
        );

        if (refreshResponse.status === 200) {
          const data = refreshResponse.data;
          setAccessToken(data.access_token);
          setAuthToken(data.access_token);
          const { role, id } = decodeToken(data.access_token);
          localStorage.setItem("userRole", role);
          setUserRole(role);
          localStorage.setItem("userID", id);
          setUserID(id);
          return data.access_token;
        } else {
          logout();
          return null;
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        logout();
        return null;
      } finally {
        setLoading(false);
        isRefreshing.current = false;
      }
    })();

    return refreshPromise.current;
  }, [accessToken, userID, logout, decodeToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        userRole,
        userID,
        login,
        logout,
        verifyAndRefreshTokens,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  return useContext(AuthContext);
};
