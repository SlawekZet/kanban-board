import { handleExitModalClick } from '@/app/lib/actions';
import { v4 as uuidv4 } from 'uuid';
import { XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { Button } from '../../utils/buttons/Button';
import { ButtonPrimaryS } from '../../utils/buttons/ButtonPrimaryS';
import { ButtonSecondary } from '../../utils/buttons/ButtonSecondary';
import { ButtonDestructive } from '../../utils/buttons/DestructiveButton';
import { useKanbanTaskManagerContext } from '@/app/lib/contexts/KanbanTaskManagerContext';

interface CreateBoardFormProps {
  modalId: string;
}

interface Column {
  id: string;
  name: string;
  tasks: any[];
}

const initialColumns = [
  { id: uuidv4(), name: '', tasks: [] },
  { id: uuidv4(), name: '', tasks: [] },
];

export const CreateBoardForm: React.FC<CreateBoardFormProps> = ({
  modalId,
}) => {
  const { boards, setBoardToRender } = useKanbanTaskManagerContext();
  const [boardName, setBoardName] = useState('');
  const [columns, setColumns] = useState<Column[]>([
    { id: uuidv4(), name: '', tasks: [] },
    { id: uuidv4(), name: '', tasks: [] },
  ]);

  const handleBoardNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleColumnNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newColumns = columns.slice();
    newColumns[index].name = e.target.value;
    setColumns(newColumns);
  };

  const handleCreateNewColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setColumns([...columns, { id: uuidv4(), name: '', tasks: [] }]);
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

  const handleCancelAndResetData = () => {
    setBoardName('');
    setColumns(initialColumns);
    () => handleExitModalClick(modalId);
  };

  const handleCreateBoard = () => {
    const newBoard = {
      id: uuidv4(),
      name: boardName,
      columns: columns,
    };

    boards.push(newBoard);
    setBoardToRender(newBoard);
  };

  return (
    <form className="flex flex-col" method="dialog">
      <h1 className="font-bold text-lg pb-6 dark:text-white">Add New Board</h1>
      <label
        htmlFor="title"
        className="text-sm font-bold text-gray3 pb-2 dark:text-white"
      >
        Name
      </label>
      <input
        type="text"
        id="title"
        onChange={handleBoardNameChange}
        value={boardName}
        className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 dark:bg-gray5 dark:border-gray4 dark:text-white"
        placeholder="e.g. Web Design"
      />

      <div className="flex flex-col gap-2 ">
        <p className="text-sm font-bold text-gray3 pt-6 dark:text-white">
          Columns
        </p>
        {columns.map((column, index) => (
          <div className="flex" key={column.id}>
            <input
              type="text"
              value={column.name}
              onChange={(e) => handleColumnNameChange(e, index)}
              className="border-[1px] rounded-md border-gray2 placeholder:text-sm py-2 px-4 w-full dark:bg-gray5 dark:border-gray4 dark:text-white"
              placeholder={`Column ${index + 1}`}
            />
            <Button
              className="ml-3"
              onClick={(e) => handleDeleteColumn(index, e)}
            >
              <XMarkIcon fill="#828FA3" className="size-6" />
            </Button>
          </div>
        ))}
      </div>
      <div className="w-full py-4">
        <ButtonSecondary className="w-full" onClick={handleCreateNewColumn}>
          + Add New Column
        </ButtonSecondary>
      </div>
      <div className="w-full pb-4">
        <ButtonPrimaryS className="w-full" onClick={handleCreateBoard}>
          Create New Board
        </ButtonPrimaryS>
      </div>
      <div className="w-full ">
        <ButtonDestructive
          className="w-full"
          onClick={handleCancelAndResetData}
        >
          Cancel
        </ButtonDestructive>
      </div>
    </form>
  );
};
