import { toast } from 'sonner';

interface UseGoogleProviderValidatorReturn {
  handlerOnScriptLoadError: () => void;
}

export const useGoogleProviderValidator = (): UseGoogleProviderValidatorReturn => {
  const handlerOnScriptLoadError = (): void => {
    toast.error('Google OAuth script failed to load', {
      closeButton: true,
      duration: Infinity,
    });
  };

  return { handlerOnScriptLoadError };
};
