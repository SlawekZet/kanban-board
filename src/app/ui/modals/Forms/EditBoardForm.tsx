import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { handleExitModalClick } from '@/app/lib/actions';
import { Button } from '../../utils/buttons/Button';
import { ButtonDestructive } from '../../utils/buttons/DestructiveButton';
import { ButtonPrimaryS } from '../../utils/buttons/ButtonPrimaryS';
import { ButtonSecondary } from '../../utils/buttons/ButtonSecondary';

interface EditBoardFormProps {
  modalId: string;
  board: Board;
}

interface Board {
  id: string;
  name: string;
  columns: TaskList[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}

interface Subtask {
  title: string;
  isCompleted: boolean;
}

interface TaskList {
  id: string;
  name: string;
  tasks: Task[];
}

export const EditBoardForm: React.FC<EditBoardFormProps> = ({
  modalId,
  board,
}) => {
  return (
    <form className="flex flex-col" method="dialog">
      <h1 className="font-bold text-lg pb-6 dark:text-white">Edit Board</h1>
      <label
        htmlFor="title"
        className="text-sm font-bold text-gray3 pb-2 dark:text-white"
      >
        Name
      </label>
      <input
        type="text"
        id="title"
        className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 dark:bg-gray5 dark:border-gray4 dark:text-white"
        defaultValue={board.name}
      />

      <div className="flex flex-col gap-2 ">
        <p className="text-sm font-bold text-gray3 pt-6 dark:text-white">
          Board Columns
        </p>
        {board.columns.map((column) => (
          <div className="flex" key={column.id}>
            <input
              id="column1"
              type="text"
              className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 w-full dark:bg-gray5 dark:border-gray4 dark:text-white"
              defaultValue={column.name}
            />
            <Button className="ml-3">
              <XMarkIcon fill="#828FA3" className="size-6" />
            </Button>
          </div>
        ))}
      </div>
      <div className="w-full py-4">
        <ButtonSecondary className="w-full">+ Add New Column</ButtonSecondary>
      </div>
      <div className="w-full pb-4">
        <ButtonPrimaryS className="w-full">Save Changes</ButtonPrimaryS>
      </div>
      <div className="w-full ">
        <ButtonDestructive
          className="w-full"
          onClick={() => handleExitModalClick(modalId)}
        >
          Cancel
        </ButtonDestructive>
      </div>
    </form>
  );
};
