import { handleExitModalClick } from '@/app/lib/actions';
import { useKanbanTaskManagerContext } from '@/app/lib/contexts/KanbanTaskManagerContext';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Button } from '../../utils/buttons/Button';
import { ButtonPrimaryS } from '../../utils/buttons/ButtonPrimaryS';
import { ButtonSecondary } from '../../utils/buttons/ButtonSecondary';
import { ButtonDestructive } from '../../utils/buttons/DestructiveButton';

interface CreateColumnFormProps {
  modalId: string;
}

export const CreateColumnForm: React.FC<CreateColumnFormProps> = ({
  modalId,
}) => {
  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('delete');
  };

  const handleAddColumnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(boardToRender?.id);
    // const newBoards = boards.map((board) => {
    //   if(board.id === boardToRender.id)
    // })
    console.log('add');
  };

  const { boardToRender, boards } = useKanbanTaskManagerContext();
  const columns = boardToRender?.columns;
  return (
    <form className="flex flex-col" method="dialog">
      <h1 className="font-bold text-lg pb-6 dark:text-white">Add New Column</h1>

      <div className="flex flex-col gap-2 ">
        <label
          htmlFor="subtask"
          className="text-sm font-bold text-gray3 pt-6 dark:text-white"
        >
          Columns
        </label>
        {columns
          ? columns.map((column) => (
              <div className="flex" key={column.id}>
                <input
                  type="text"
                  id={column.id}
                  className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 w-full dark:bg-gray5 dark:border-gray4 dark:text-white"
                  defaultValue={column.name}
                />
                <Button className="ml-3" onClick={handleDeleteClick}>
                  <XMarkIcon fill="#828FA3" className="size-6" />
                </Button>
              </div>
            ))
          : null}
      </div>
      <div className="py-4">
        <ButtonSecondary className="w-full" onClick={handleAddColumnClick}>
          + Add New Column
        </ButtonSecondary>
      </div>
      <div className="pb-4">
        <ButtonPrimaryS className="w-full">Save</ButtonPrimaryS>
      </div>
      <div>
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
