import { FormEvent } from 'react';
import { Button } from '../buttons/Button';

interface SignUpFormProps {
  email: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  password,
  setPassword,
  setEmail,
  handleSubmit,
}) => {
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="w-3/4 mb-2">
        <div className="mb-4">
          <label
            className="block text-gray5 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 text-gray-900 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray5 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-center">
          <Button
            // type="submit"
            className="font-bold bg-gray2 dark:bg-gray5 px-4 py-2 rounded-lg w-[150px] text-center"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
};
