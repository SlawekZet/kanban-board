import React from 'react';
import { ButtonSecondary } from '../../utils/buttons/ButtonSecondary';
import { useKanbanTaskManagerContext } from '@/app/lib/contexts/KanbanTaskManagerContext';
import { ButtonDestructive } from '../../utils/buttons/DestructiveButton';

interface DeleteElementProps {
  element: string;
  name: string | undefined;
  modalId: string;
  elementId: string;
  boardId: string;
}

export const DeleteElement: React.FC<DeleteElementProps> = ({
  element,
  name,
  modalId,
  elementId,
  boardId,
}) => {
  const { setIsDeleteModalVisible, boards, setBoards, setBoardToRender } =
    useKanbanTaskManagerContext();
  const handleExitModalClick = (modalId: string) => {
    const modal = document.querySelector<HTMLDialogElement>(`#${modalId}`);
    if (modal) {
      modal.close();
    }
    setIsDeleteModalVisible(false);
  };

  const handleDeleteItem = () => {
    console.log('Element ID', elementId);
    const newBoards = boards.map((board) => {
      return {
        ...board,
        columns: board.columns.map((column) => {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== elementId),
          };
        }),
      };
    });
    const newBoardToRender = newBoards.filter((board) => board.id === boardId);
    setBoards(newBoards);
    setBoardToRender(newBoardToRender[0]);
    setIsDeleteModalVisible(false);
  };

  return (
    <div className="">
      <h2 className="text-lg font-bold text-red2 pb-6">
        Delete this {element}?
      </h2>
      <div className="text-sm text-gray3 pb-6">
        {element === 'task' ? (
          <p>
            Are you sure you want to delete the {name} task and its subtasks?
            This action cannot be reversed.{' '}
          </p>
        ) : element === 'board' ? (
          <p>
            Are you sure you want to delete the {name} board? This action will
            remove all columns and tasks and cannot be reversed.
          </p>
        ) : (
          <p>
            Are you sure you want to delete the {name} {element}? This action
            cannot be reversed.
          </p>
        )}
      </div>
      <div className="flex gap-4 w-full">
        <ButtonDestructive
          onClick={() => handleDeleteItem()}
          className="w-full"
        >
          Delete
        </ButtonDestructive>
        <ButtonSecondary
          onClick={() => handleExitModalClick(modalId)}
          className="w-full"
        >
          Cancel
        </ButtonSecondary>
      </div>
    </div>
  );
};
