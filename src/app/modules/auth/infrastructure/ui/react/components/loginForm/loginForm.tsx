import { type LoginWithEmailAndPasswordFormValues } from '@/modules/auth/domain/models/loginWithEmailAndPasswordFormValues.model';
import { loginWithEmailAndPasswordFormValuesSchema } from '@/modules/auth/infrastructure/schemas/loginWithEmailAndPasswordFormValues.schema';
import { Button } from '@/modules/shared/infrastructure/ui/shadcn/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/modules/shared/infrastructure/ui/shadcn/components/ui/form';
import { Input } from '@/modules/shared/infrastructure/ui/shadcn/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

interface LoginWithEmailAndPasswordFormProps {
  onSubmit: (values: LoginWithEmailAndPasswordFormValues) => Promise<void> | void;
  isLoading: boolean;
}

export const LoginWithEmailAndPasswordForm = ({
  onSubmit,
  isLoading,
}: LoginWithEmailAndPasswordFormProps): ReactElement => {
  const form = useForm<LoginWithEmailAndPasswordFormValues>({
    resolver: zodResolver(loginWithEmailAndPasswordFormValuesSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={e => void form.handleSubmit(onSubmit)(e)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ephraim@blocks.so" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="**************" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full py-2 font-medium" disabled={isLoading}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Sign in
        </Button>
      </form>
    </Form>
  );
};
