import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Button } from '../../utils/buttons/Button';
import { ButtonDestructive } from '../../utils/buttons/DestructiveButton';
import { ButtonPrimaryS } from '../../utils/buttons/ButtonPrimaryS';
import { ButtonSecondary } from '../../utils/buttons/ButtonSecondary';
import { useKanbanTaskManagerContext } from '@/app/lib/contexts/KanbanTaskManagerContext';

interface EditTaskFormProps {
  modalId: string;
  task: Task;
  column: string;
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

export const EditTaskForm: React.FC<EditTaskFormProps> = ({
  modalId,
  task,
  column,
}) => {
  const { boardToRender, setIsElementEdited } = useKanbanTaskManagerContext();

  const handleExitModalClick = (modalId: string) => {
    const modal = document.querySelector<HTMLDialogElement>(`#${modalId}`);
    if (modal) {
      modal.close();
    }

    setIsElementEdited(false);
  };

  return (
    <form className="flex flex-col" method="dialog">
      <h1 className="font-bold text-lg pb-6 dark:text-white">Edit Task</h1>
      <label
        htmlFor="title"
        className="text-sm font-bold text-gray3 pb-2 dark:text-white"
      >
        Title
      </label>
      <input
        type="text"
        id="title"
        className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 dark:bg-gray5 dark:border-gray4 dark:text-white"
        defaultValue={task.title}
      />
      <label
        htmlFor="desc"
        className="text-sm font-bold text-gray3 pb-2 pt-6 dark:text-white"
      >
        Description
      </label>
      <textarea
        id="desc"
        className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 dark:text-white dark:bg-gray5 dark:border-gray4 text-sm"
        placeholder={
          task.description
            ? ''
            : 'e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
        }
        defaultValue={task.description ? task.description : ''}
      ></textarea>
      <div className="flex flex-col gap-2 ">
        <p className="text-sm font-bold text-gray3 pt-6 dark:text-white">
          Subtasks
        </p>
        {task.subtasks.map((subtask, index) => (
          <div className="flex" key={index}>
            <input
              type="text"
              id="subtask1"
              className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 w-full dark:bg-gray5 dark:border-gray4 dark:text-white"
              defaultValue={subtask.title}
            />
            <Button className="ml-3">
              <XMarkIcon fill="#828FA3" className="size-6" />
            </Button>
          </div>
        ))}
      </div>
      <div className="w-full py-4">
        <ButtonSecondary className="w-full">+ Add New Subtask</ButtonSecondary>
      </div>
      <div className="flex flex-col pb-2">
        <label
          htmlFor="status"
          className="text-sm font-bold text-gray3 pb-2 pt-2 dark:text-white"
        >
          Status / Column
        </label>
        <input
          list="columns"
          id="status"
          className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 w-full  dark:bg-gray5 dark:border-gray4 dark:text-white"
          defaultValue={column}
        />
        <datalist id="columns">
          {boardToRender
            ? boardToRender.columns.map((column) => (
                <option key={column.id} value={column.name} />
              ))
            : null}
        </datalist>
      </div>
      <div className="w-full py-4">
        <ButtonPrimaryS className="w-full">Create Task</ButtonPrimaryS>
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
