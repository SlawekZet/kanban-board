import { Droppable } from 'react-beautiful-dnd';
import { Task } from './Task';

interface TaskListProps {
  columnId: string;
  name: string;
  tasks: Task[];
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

export const TaskList = ({ name, tasks, columnId, boardId }: TaskListProps) => {
  return (
    <Droppable droppableId={columnId} type="TaskList">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex flex-col w-[300px] min-w-[300px]"
        >
          <div className="uppercase text-gray3 tracking-[3px] font-bold">
            <div className="flex flex-row items-center pb-6 gap-4 pl-1">
              <div className="w-5 h-5 rounded-full bg-violet2"></div>
              <h2>
                {name} ({tasks.length})
              </h2>
            </div>
          </div>
          <div
            id="tasksContainer"
            className="flex flex-col gap-4 max-h-[calc(100vh-177px)] h-[calc(100vh-177px)] overflow-auto pl-1 pr-2 pt-1 pb-2"
          >
            {tasks.map((e, index) => (
              <Task
                task={e}
                index={index}
                id={e.id}
                key={e.id}
                name={name}
                boardId={boardId}
                columnId={columnId}
              />
            ))}
          </div>
          {/* {provided.placeholder} */}
        </div>
      )}
    </Droppable>
  );
};
