import { handleExitModalClick } from '@/app/lib/actions';
import { useKanbanTaskManagerContext } from '@/app/lib/contexts/KanbanTaskManagerContext';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { Button } from '../../utils/buttons/Button';
import { ButtonPrimaryS } from '../../utils/buttons/ButtonPrimaryS';
import { ButtonSecondary } from '../../utils/buttons/ButtonSecondary';
import { ButtonDestructive } from '../../utils/buttons/DestructiveButton';
import { v4 as uuidv4, v4 } from 'uuid';

interface CreateColumnFormProps {
  modalId: string;
}

interface Column {
  id: string;
  name: string;
  tasks: any[];
}

export const CreateColumnForm: React.FC<CreateColumnFormProps> = ({
  modalId,
}) => {
  const { boardToRender, boards, setBoardToRender } =
    useKanbanTaskManagerContext();
  const [columns, setColumns] = useState<Column[]>(boardToRender.columns);

  const handleAddColumnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColumns([...columns, { id: uuidv4(), name: '', tasks: [] }]);
  };

  const handleColumnNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newColumns = columns.slice();
    newColumns[index].name = e.target.value;
    setColumns(newColumns);
  };

  const handleDeleteColumn = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const updatedColumns = columns.slice();
    updatedColumns.splice(index, 1);
    setColumns(updatedColumns);
  };

  const handleSaveButton = () => {
    if (boardToRender) {
      const updatedBoard = {
        ...boardToRender,
        columns: [...columns],
      };
      setBoardToRender(updatedBoard);
      console.log(boards);
    }
  };

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
          ? columns.map((column, index) => (
              <div className="flex" key={column.id}>
                <input
                  type="text"
                  id={column.id}
                  className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 w-full dark:bg-gray5 dark:border-gray4 dark:text-white"
                  defaultValue={column.name}
                  value={column.name}
                  onChange={(e) => handleColumnNameChange(e, index)}
                />
                <Button
                  className="ml-3"
                  onClick={(e) => handleDeleteColumn(index, e)}
                >
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
        <ButtonPrimaryS className="w-full" onClick={handleSaveButton}>
          Save
        </ButtonPrimaryS>
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
