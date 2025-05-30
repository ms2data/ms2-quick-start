import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState, useCallback } from "react";

export function useAuth() {
  const {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    getAccessTokenSilently,
    error: auth0Error,
    user,
    logout,
  } = useAuth0();

  const [accessToken, setAccessToken] = useState<string>();
  const [authError, setAuthError] = useState<Error | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogin = useCallback(async () => {
    try {
      await loginWithRedirect({
        appState: { returnTo: window.location.pathname },
      });
    } catch (error) {
      setAuthError(error as Error);
    }
  }, [loginWithRedirect]);

  // Initial auth check
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      handleLogin();
    }
  }, [isLoading, isAuthenticated, handleLogin]);

  // Token management
  useEffect(() => {
    let didCancel = false;

    const fetchTokenSmart = async () => {
      if (!isLoading && isAuthenticated && !accessToken) {
        setIsRefreshing(true);
        try {
          const token = await getAccessTokenSilently({ cacheMode: "on" });
          if (!didCancel) {
            setAccessToken(token);
            setAuthError(null);
          }
        } catch (err) {
          console.warn("Cached token failed, trying forced refresh...");
          try {
            const token = await getAccessTokenSilently({ cacheMode: "off" });
            if (!didCancel) {
              setAccessToken(token);
              setAuthError(null);
            }
          } catch (finalErr) {
            if (!didCancel) {
              console.error("Silent refresh ultimately failed:", finalErr);
              setAuthError(finalErr as Error);
            }
          }
        } finally {
          if (!didCancel) {
            setIsRefreshing(false);
          }
        }
      }
    };

    fetchTokenSmart();

    return () => {
      didCancel = true;
    };
  }, [isLoading, isAuthenticated, accessToken, getAccessTokenSilently]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setAuthError(new Error("Silent auth timed out"));
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  useEffect(() => {
    if (authError && isAuthenticated) {
      console.warn("Fatal auth error, redirecting to login...");
      handleLogin();
    }
  }, [authError, isAuthenticated, handleLogin]);

  return {
    isLoading: isLoading || isRefreshing,
    isAuthenticated,
    accessToken,
    error: authError || auth0Error,
    handleLogin,
    user,
    logout,
  };
}
