import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type RegisterFormValues } from '@/modules/auth/domain/models/registerFormValues.model';
import { registerFormValuesSchema } from '@/modules/auth/infrastructure/schemas/registerFormValues.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import type { JSX } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface RegisterFormProps {
  onSubmit: SubmitHandler<RegisterFormValues>;
  isPending: boolean;
}

export const RegisterForm = ({ onSubmit, isPending }: RegisterFormProps): JSX.Element => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormValuesSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={e => void form.handleSubmit(onSubmit)(e)} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input {...form.register('name')} id="name" placeholder="Name" className="mt-2" />
          {form.formState.errors.name && (
            <p className="text-xs text-red-500 mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input {...form.register('email')} id="email" placeholder="ephraim@blocks.so" className="mt-2" />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500 mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input {...form.register('password')} type="password" id="password" placeholder="Password" className="mt-2" />
          {form.formState.errors.password && (
            <p className="text-xs text-red-500 mt-1">{form.formState.errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            {...form.register('confirmPassword')}
            type="password"
            id="confirmPassword"
            placeholder="Password"
            className="mt-2"
          />
          {form.formState.errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-4 w-full py-2 font-medium"
          disabled={form.formState.isSubmitting || isPending}
        >
          Create account
          {isPending && <Loader2 className={`w-4 h-4 ml-2 ${isPending ? 'inline-block animate-spin' : 'hidden'}`} />}
        </Button>
      </form>
    </Form>
  );
};
