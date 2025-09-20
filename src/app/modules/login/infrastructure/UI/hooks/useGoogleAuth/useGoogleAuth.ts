import type { AuthStateDTO } from "@/app/modules/login/application/dtos/authState.dto";
import type { GoogleCredentialResponseDTO } from "@/app/modules/login/application/dtos/googleCredentialResponse.dto";
import type { GoogleUserDTO } from "@/app/modules/login/application/dtos/googleUser.dto";
import { useCallback, useEffect, useState } from "react";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const useGoogleAuth = () => {
  const [authState, setAuthState] = useState<AuthStateDTO>({
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  });

  // Decode JWT token to get user info
  const decodeJWT = (token: string): GoogleUserDTO => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  // Initialize Google Sign-In
  const initializeGoogleSignIn = useCallback(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }, []);

  // Handle credential response from Google
  const handleCredentialResponse = (response: GoogleCredentialResponseDTO) => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

      const userInfo = decodeJWT(response.credential);
      // Store in localStorage for persistence
      localStorage.setItem("googleUser", JSON.stringify(userInfo));
      localStorage.setItem("googleToken", response.credential);

      setAuthState({
        isAuthenticated: true,
        user: userInfo,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error processing Google response:", error);
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Failed to process Google authentication",
      }));
    }
  };

  // Sign in with Google
  const signIn = () => {
    if (!window.google) {
      setAuthState((prev) => ({
        ...prev,
        error: "Google Sign-In not loaded",
      }));
      return;
    }

    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    window.google.accounts.id.prompt();
  };

  // Sign out
  const signOut = () => {
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }

    localStorage.removeItem("googleUser");
    localStorage.removeItem("googleToken");

    setAuthState({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    });
  };

  // Check for stored authentication on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("googleUser");
    const storedToken = localStorage.getItem("googleToken");

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("googleUser");
        localStorage.removeItem("googleToken");
      }
    }
  }, []);

  // Initialize Google Sign-In when the script loads
  useEffect(() => {
    const initializeWhenReady = () => {
      if (window.google) {
        initializeGoogleSignIn();
      } else {
        setTimeout(initializeWhenReady, 100);
      }
    };

    initializeWhenReady();
  }, [initializeGoogleSignIn]);

  return {
    ...authState,
    signIn,
    signOut,
  };
};

//TODO: Pendiente revisar porque no me lo toma cuando está por fuera de este archivo
declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: unknown) => void;
          prompt: () => void;
          disableAutoSelect: () => void;
          renderButton: (parent: Element, options: unknown) => void;
        };
      };
    };
  }
}
