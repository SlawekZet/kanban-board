import { handleExitModalClick } from '@/app/lib/actions';
import { useKanbanTaskManagerContext } from '@/app/lib/contexts/KanbanTaskManagerContext';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { Button } from '../../utils/buttons/Button';
import { ButtonPrimaryS } from '../../utils/buttons/ButtonPrimaryS';
import { DeleteElement } from './DeleteElement';
import { EditTaskForm } from './EditTaskForm';

interface TaskDetailsFormProps {
  task: Task;
  modalId: string;
  column: string;
  columnId: string;
  taskId: string;
  boardId: string;
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
export const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({
  task,
  modalId,
  column,
  columnId,
  taskId,
  boardId,
}) => {
  const {
    isElementEdited,
    setIsElementEdited,
    isMenuVisible,
    setIsMenuVisible,
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    boards,
    setBoards,
    setBoardToRender,
  } = useKanbanTaskManagerContext();

  const handleMenuClick = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleSubtaskCheckboxClick = (index: number) => {
    const newBoards = boards.map((board) => {
      if (board.id === boardId) {
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                tasks: column.tasks.map((task) => {
                  if (task.id === taskId) {
                    return {
                      ...task,
                      subtasks: task.subtasks.map((subtask, subtaskIndex) => {
                        if (subtaskIndex === index) {
                          return {
                            ...subtask,
                            isCompleted: !subtask.isCompleted,
                          };
                        }
                        return subtask;
                      }),
                    };
                  }
                  return task;
                }),
              };
            }
            return column;
          }),
        };
      }
      return board;
    });
    const newBoardToRender = newBoards.find((board) => board.id === boardId);

    setBoards(newBoards);
    if (newBoardToRender) {
      setBoardToRender(newBoardToRender);
    } else {
      console.error('Something went wrong while saving the data');
    }
  };

  const handleEditClick = () => {
    setIsElementEdited((prev) => !prev);
    setIsMenuVisible(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalVisible((prev) => !prev);
    setIsMenuVisible(false);
  };

  return (
    <>
      {isElementEdited ? (
        <EditTaskForm modalId={`edit${task.id}`} task={task} column={column} />
      ) : isDeleteModalVisible ? (
        <DeleteElement
          modalId={`modal${task.id}`}
          name={task.title}
          element="task"
          elementId={taskId}
          boardId={boardId}
        />
      ) : (
        <div>
          <div className="flex flex-row  justify-between cursor-default">
            <h1 className="font-bold text-lg dark:text-white pr-2">
              {task.title}
            </h1>
            <Button onClick={handleMenuClick}>
              <EllipsisVerticalIcon fill="#828FA3" className="size-6" />
            </Button>
          </div>
          {isMenuVisible && (
            <div className="absolute left-[360px] p-6 bg-white dark:bg-gray6 flex flex-col gap-2 items-start w-[120px] shadow-md rounded-md text-sm z-50">
              <Button
                onClick={handleEditClick}
                className="text-left dark:text-gray3"
              >
                Edit Task
              </Button>
              <Button
                onClick={handleDeleteClick}
                className="text-left text-red2"
              >
                Delete Task
              </Button>
            </div>
          )}
          <p className="py-6 text-sm leading-6 font-semibold text-gray3">
            {task.description}
          </p>
          <p className="pb-4 text-sm font-bold text-gray3 dark:text-white">
            Subtasks ({task.subtasks.filter((sub) => !sub.isCompleted).length}{' '}
            of {task.subtasks.length})
          </p>
          <div className="flex flex-col items-start gap-2 pb-6">
            {task.subtasks.map((subtask, index) => (
              <div
                className="bg-gray1 dark:bg-gray6 dark:text-white rounded-sm p-2 w-full flex"
                key={index}
              >
                <input
                  type="checkbox"
                  id={`subtask-${index}`}
                  checked={subtask.isCompleted}
                  onChange={() => handleSubtaskCheckboxClick(index)}
                />
                <label
                  htmlFor={`subtask-${index}`}
                  className={`text-sm pl-4 font-semibold ${
                    subtask.isCompleted ? 'text-gray3 line-through' : ''
                  }`}
                >
                  {subtask.title}
                </label>
              </div>
            ))}
          </div>
          <ButtonPrimaryS
            className="w-full"
            onClick={() => handleExitModalClick(modalId)}
          >
            OK
          </ButtonPrimaryS>
        </div>
      )}
    </>
  );
};
