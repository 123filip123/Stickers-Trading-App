// AuthContext.tsx
import React, { ReactNode, createContext, useContext, useReducer } from "react";

interface AuthState {
  isLogged: boolean;
}

type AuthAction = { type: "LOGIN" } | { type: "LOGOUT" };

const initialState: AuthState = {
  isLogged: false,
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
      return { ...state, isLogged: true };
    case "LOGOUT":
      return { ...state, isLogged: false };
    default:
      return state;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
