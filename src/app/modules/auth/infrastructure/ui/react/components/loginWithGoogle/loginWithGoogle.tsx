import { Button } from '@/modules/shared/infrastructure/ui/shadcn/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { useState, type ReactElement } from 'react';
import { toast } from 'sonner';
import { GoogleIcon } from '../../icons/google.svg';

interface LoginWithGoogleProps {
  onSuccess: (args: { code: string }) => void;
  isPendingLogin: boolean;
}

export const LoginWithGoogle = ({ onSuccess, isPendingLogin }: LoginWithGoogleProps): ReactElement => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginGoogle = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: response => {
      onSuccess({ code: response.code });
      setIsLoading(false);
    },
    onError: error => {
      toast.error('Login failed. Please try again.', {
        duration: Infinity,
        description: error.error_description ?? 'An unexpected error occurred.',
        closeButton: true,
      });
      setIsLoading(false);
    },
    onNonOAuthError() {
      toast.error('Login failed. Please try again.', {
        duration: Infinity,
        description: 'Popup closed by user',
        closeButton: true,
      });
      setIsLoading(false);
    },
  });

  const handleLogin: VoidFunction = () => {
    setIsLoading(true);
    loginGoogle();
  };

  const isDisabled = isLoading || isPendingLogin;

  return (
    <Button
      variant="outline"
      onClick={handleLogin}
      disabled={isDisabled}
      className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 shadow-sm transition-all duration-200 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="flex items-center justify-center gap-3">
        {isDisabled ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <GoogleIcon
            className={`size-5 transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`}
            aria-hidden={true}
          />
        )}
        {isDisabled ? 'Signing in...' : 'Continue with Google'}
      </span>
    </Button>
  );
};
