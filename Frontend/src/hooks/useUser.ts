
import { getCurrentUser, logout, signinUser, signupUser } from "@/Services/userService";
import React from "react";
import { useNavigate } from "react-router-dom";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
} | null;

type UseUserReturn = {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (input: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  signin: (input: { email: string; password: string }) => Promise<void>;
  logoutUser: () => void;
};

export function useUser(): UseUserReturn {
  const [user, setUser] = React.useState<User>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const navigate = useNavigate();

  // Check authentication status on mount
  React.useEffect(() => {
    const checkAuthStatus = async () => {
      setIsLoading(true);

      try{
        const userData = await getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } 
      catch(err){
        console.error("User not authenticated", err);
        setUser(null);
      }
      finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const signup = async ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
    const userData = await signupUser({ firstName, lastName, email, password });
    setUser(userData);
    setIsAuthenticated(true);
  };

  const signin = async ({ email, password }: { email: string; password: string }) => {
    const userData = await signinUser({ email, password });
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  return { user, isAuthenticated, isLoading, signup, signin, logoutUser };
}