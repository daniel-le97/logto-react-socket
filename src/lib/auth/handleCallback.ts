import { LogtoContext } from "../../../node_modules/@logto/react/lib/context.js";
import { useCallback, useContext, useEffect, useRef } from "react";
import { trySafe } from "@silverhand/essentials";

const useErrorHandler = () => {
  const { setError } = useContext(LogtoContext);
  const handleError = useCallback(
    (error: Error, fallbackErrorMessage: string) => {
      if (error instanceof Error) {
        setError(error);
      } else if (fallbackErrorMessage) {
        setError(new Error(fallbackErrorMessage));
      }
      console.error(error);
    },
    [setError]
  );
  return { handleError };
};

export const useHandleSignInCallback = (callback: () => void) => {
  const {
    logtoClient,
    isAuthenticated,
    error,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
  } = useContext(LogtoContext);
  const { handleError } = useErrorHandler();
  const callbackRef = useRef<() => void>();
  useEffect(() => {
    callbackRef.current = callback; // Update ref to the latest callback.
  }, [callback]);
  useEffect(() => {
    console.log("isLoading", isLoading);
    if (!logtoClient || error) {
      console.log("returning");
      return;
    }
    (async () => {
      const currentPageUrl =
        localStorage.getItem("logto:currentPageUrl") || window.location.href;

      localStorage.removeItem("logto:currentPageUrl");

      const isRedirected = await logtoClient.isSignInRedirected(currentPageUrl);
      if (!isAuthenticated && isRedirected) {
        setIsLoading(true);
        await trySafe(
          async () => {
            await logtoClient.handleSignInCallback(currentPageUrl);
            setIsAuthenticated(true);
            callbackRef.current?.();
          },
          (error) => {
            handleError(
              error as Error,
              "Unexpected error occurred while handling sign in callback."
            );
          }
        );
        setIsLoading(false);
      }
    })();
  }, [
    error,
    handleError,
    isAuthenticated,
    isLoading,
    logtoClient,
    setIsAuthenticated,
    setIsLoading,
  ]);
  return {
    isLoading,
    isAuthenticated,
    error,
  };
};
