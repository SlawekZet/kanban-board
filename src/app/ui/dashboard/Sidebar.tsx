'use client';
import { useKanbanTaskManagerContext } from '@/app/lib/contexts/KanbanTaskManagerContext';
import { auth } from '@/app/lib/firebase-auth/config';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { signOut } from 'firebase/auth';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BoardList } from '../boards/BoardList';
import { Button } from '../utils/buttons/Button';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const { isSidebarHidden, setIsSidebarHidden } = useKanbanTaskManagerContext();

  const handleHideSidebarClick = () => {
    setIsSidebarHidden((prevIsSidebarHidden) => !prevIsSidebarHidden);
  };
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [user] = useAuthState(auth);

  const handleSignOut = () => {
    console.log(`${user?.email} has been logged out`);
    if (user) {
      signOut(auth);
      router.push('/');
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  console.log(user?.email);

  return isSidebarHidden ? (
    <div className="w-full justify-self-start self-end mb-4 z-10 absolute">
      <Button
        className="bg-violet2 p-2 rounded-r-full w-12 h-12 flex items-center"
        onClick={handleHideSidebarClick}
      >
        <EyeIcon className="size-6" />
      </Button>
    </div>
  ) : (
    <section className="flex flex-col justify-between flex-1 pb-4 min-w-[300px] max-w-[300px] border-r-[1px] border-gray2 dark:border-gray4 dark:bg-gray5">
      <div className="">
        {resolvedTheme === 'dark' ? (
          <Image
            width={200}
            height={85}
            src="/logo-light.svg"
            alt="kanban task manager logotype"
            className="pb-6 pl-8 pt-8"
          />
        ) : (
          <Image
            width={200}
            height={85}
            src="/logo-dark.svg"
            alt="kanban task manager logotype"
            className="pb-6 pl-8 pt-8"
          />
        )}
        <BoardList />
      </div>
      <div className="flex flex-col">
        <ThemeSwitcher />

        <Button
          onClick={handleSignOut}
          className="text-sm text-gray5 px-4 py-2 rounded-lg text-center"
        >
          Sign Out
        </Button>

        <Button
          onClick={handleHideSidebarClick}
          className="flex flex-row ml-2 mt-2 p-3 items-center font-bold text-gray3 text-sm gap-2"
        >
          <EyeSlashIcon className="size-6" />
          Hide Sidebar
        </Button>
      </div>
    </section>
  );
}
