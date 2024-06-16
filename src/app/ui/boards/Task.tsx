import { Draggable } from 'react-beautiful-dnd';
import { TaskDetailsForm } from '../modals/Forms/TaskDetailsForm';
import { Modal } from '../modals/Modal';

interface TaskProps {
  task: Task;
  index: number;
  name: string;
  id: string;
  boardId: string;
  columnId: string;
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

export const Task = ({
  task,
  index,
  name,
  id,
  boardId,
  columnId,
}: TaskProps) => {
  const handleTaskClick = () => {
    const modal = document.querySelector<HTMLDialogElement>(`#modal${task.id}`);
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <Draggable draggableId={task.id} key={task.id} index={index}>
        {(provided) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div
              className="flex flex-col gap-2 px-4 py-6 rounded-xl bg-white dark:bg-gray5 text-m shadow-md w-full text-start"
              onClick={handleTaskClick}
            >
              <p className="font-bold dark:text-white">{task.title}</p>
              <p className="text-xs font-bold text-gray3">
                {
                  task.subtasks.filter((sub) => sub.isCompleted !== false)
                    .length
                }
                of {task.subtasks.length} Subtasks
              </p>
            </div>
          </div>
        )}
      </Draggable>
      <Modal id={`modal${task.id}`}>
        <TaskDetailsForm
          task={task}
          modalId={`modal${task.id}`}
          column={name}
          columnId={columnId}
          taskId={id}
          boardId={boardId}
        />
      </Modal>
    </>
  );
};
