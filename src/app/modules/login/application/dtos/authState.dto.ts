import type { GoogleUserDTO } from "./googleUser.dto";

export interface AuthStateDTO {
  isAuthenticated: boolean;
  user: GoogleUserDTO | null;
  isLoading: boolean;
  error: string | null;
}
