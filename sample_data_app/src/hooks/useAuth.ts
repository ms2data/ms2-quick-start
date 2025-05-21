import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useCallback } from "react";

export function useAuth() {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getIdTokenClaims,
    error: auth0Error,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState<string>();
  const [authError, setAuthError] = useState<Error | null>(null);

  const handleLogin = useCallback(async () => {
    if (!isLoading && !isAuthenticated) {
      try {
        await loginWithRedirect({
          appState: { returnTo: window.location.pathname },
        });
      } catch (error) {
        setAuthError(error as Error);
      }
    }
  }, [isLoading, isAuthenticated, loginWithRedirect]);

  const fetchToken = useCallback(async () => {
    try {
      const token = await getIdTokenClaims();
      if (token) {
        setAccessToken(token.__raw);
        setAuthError(null);
      }
    } catch (error) {
      setAuthError(error as Error);
    }
  }, [getIdTokenClaims]);

  // Initial auth check
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      handleLogin();
    }
  }, [isLoading, isAuthenticated, handleLogin]);

  // Token management
  useEffect(() => {
    if (!isLoading && isAuthenticated && !accessToken) {
      fetchToken();
    }
  }, [isLoading, isAuthenticated, accessToken, fetchToken]);

  return {
    isLoading,
    isAuthenticated,
    accessToken,
    error: authError || auth0Error,
    handleLogin,
  };
}
