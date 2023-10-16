import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios"; // You may need to import axios or use your HTTP library of choice
import { axiosApi } from "./network/Auth/config/config";
import { Endpoints } from "./network/endpoints";

// Define the authentication state and actions
interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

type AuthAction = { type: "LOGIN" } | { type: "LOGOUT" } | { type: "LOADING" };

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
};

const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { isAuthenticated: false, isLoading: false };
    case "LOADING":
      return { isAuthenticated: state.isAuthenticated, isLoading: true };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check the current user using your API endpoint
    const checkCurrentUser = async () => {
      try {
        const api = await axiosApi();
        const response = await api.get(Endpoints.authUser); // Replace with your endpoint
        // If the request is successful, set the user and mark as authenticated
        dispatch({ type: "LOGIN" });
      } catch (error) {
        // If the request fails, mark as unauthenticated
        dispatch({ type: "LOGOUT" });
      }
    };

    checkCurrentUser();
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
